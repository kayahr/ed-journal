/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

// Import events which registers event updates
import "./events/carrier/CarrierStats";
import "./events/travel/Docked";
import "./events/station/EngineerCraft";
import "./events/travel/FSDJump";
import "./events/travel/Location";
import "./events/exploration/Scan";
import "./events/startup/Statistics";
import "./events/other/Synthesis";

import * as chokidar from "chokidar";
import * as fs from "fs";
import * as glob from "glob";
import * as os from "os";
import * as path from "path";
import { promisify } from "util";

import type { AnyJournalEvent } from "./AnyJournalEvent";
import { JournalError } from "./JournalError";
import { updateJournalEvent } from "./JournalEvent";
import type { JournalPosition } from "./JournalPosition";
import { getErrorMessage } from "./util/error";
import { LineReader } from "./util/LineReader";
import { Notifier } from "./util/Notifier";

/**
 * Compare function to sort journal file names by time. Empty string is always earlier than any journal file.
 *
 * @param a - First filename to compare.
 * @param b - Second filename to compare.
 * @return The comparison result to sort the journal file names fro oldest to newest.
 */
function journalTimeCompare(a: string, b: string): number {
    if (a.length === b.length) {
        // Same length means same date format which we can compare alphabetically
        return a.localeCompare(b);
    } else {
        // Different length means the date format has changed. The newer one is longer
        return a.length - b.length;
    }
}

/**
 * Options for reading journal files.
 */
export interface JournalOptions {
    /** Optional journal directory. If not specified then automatically determined by looking in popular spots. */
    directory?: string;

    /**
     * Optional position within the journal where to start at. Can be either a specific journal position or the
     * string "end" to indicate starting at the end of the journal. Starting at the end only makes sense for watch
     * mode to only watch for new events. In normal read mode you would simply read no events at all.
     */
    position?: JournalPosition | "start" | "end";

    /**
     * Set to true to watch the journal for new events. False (default) just reads the existing journal events and
     * does not wait for new ones.
     */
    watch?: boolean;
}

/**
 * Journal reader/watcher.
 *
 * Reads or watches a journal directory. It implements the AsyncIterable interface so for reading/watching the
 * journal you simply iterate of the instance of this class with a for..of loop for example. If you prefer you can
 * also use the [[next]] method to read the next event from the journal until this method returns null to indicate
 * the end of the journal.
 *
 * In watch mode the iteration does not end and is continued every time a new event is appended to the journal by the
 * game. Watch mode can be stopped by calling the [[close]] method. Iteration loops will end when journal is closed.
 */
export class Journal implements AsyncIterable<AnyJournalEvent> {
    /** The journal directory. */
    private readonly directory: string;

    /** The current journal position pointing to the next event to read. */
    private position: JournalPosition;

    /** The generator used for reading journal events. */
    private readonly generator: AsyncGenerator<AnyJournalEvent>;

    /** The abort controller used to stop watch mode. */
    private readonly abortController: AbortController;

    /**
     * Creates journal reader.
     */
    public constructor(
        {
            directory = Journal.findDirectory(),
            position = "start",
            watch = false
        }: JournalOptions = {}
    ) {
        this.directory = directory;
        this.position = position === "start" ? { file: "", offset: 0, line: 1 }
            : position === "end" ? this.findEnd()
            : { ...position };
        this.abortController = new AbortController();
        this.generator = this.createGenerator(watch, this.abortController.signal);
    }

    /**
     * Searches for the journal directory in common spaces. First it checks for existence of directory specified with
     * environment variable ED_JOURNAL_DIR. Then it looks into the standard directory on a windows system and then
     * it checks to standard directory within Proton (for Linux).
     *
     * If you know more common journal locations then please let me know so I can improve the search.
     *
     * @return The found journal directory.
     * @throws JournalError - When journal directory was not found.
     */
    public static findDirectory(): string {
        const nativeHome = os.homedir();
        const protonHome = ".local/share/Steam/steamapps/compatdata/359320/pfx/drive_c/users/steamuser";
        const eliteDir = "Saved Games/Frontier Developments/Elite Dangerous";
        const candidates = [
            path.join(nativeHome, eliteDir),
            path.join(nativeHome, protonHome, eliteDir)
        ];
        const dirFromEnv = process.env["ED_JOURNAL_DIR"];
        if (dirFromEnv != null) {
            // Check ED_JOURNAL_DIR first if present
            candidates.unshift(dirFromEnv);
        }
        const journalDirectory = candidates.find(candidate => fs.existsSync(candidate));
        if (journalDirectory == null) {
            throw new JournalError("Unable to find Elite Dangerous Journal directory");
        }
        return journalDirectory;
    }

    /**
     * Returns the journal directory.
     *
     * @return The journal directory.
     */
    public getDirectory(): string {
        return this.directory;
    }

    /**
     * Returns the current journal position which points to the next event to read.
     *
     * @return The current journal position.
     */
    public getPosition(): JournalPosition {
        return { ...this.position };
    }

    /**
     * Closes the journal. This only has a meaning when running in watch mode. The watcher is aborted and does not
     * report any more updates.
     */
    public close(): void {
        this.abortController.abort();
    }

    /**
     * Finds the end position of the journal and returns it.
     *
     * @return End position of the journal.
     */
    public findEnd(): JournalPosition {
        const file = glob.sync("Journal.*.log", { cwd: this.directory }).sort(journalTimeCompare).reverse()[0];
        if (file == null) {
            // No journal file found, return start as end
            return { file: "", offset: 0, line: 1 };
        }

        // Find last line number and also create the end offset (which is the same as the file size) during the process
        const descriptor = fs.openSync(path.join(this.directory, file), "r");
        const buffer = new Uint8Array(8192);
        let offset = 0;
        let line = 1;
        let read;
        while ((read = fs.readSync(descriptor, buffer)) > 0) {
            offset += read;
            for (let i = 0; i < read; i++) {
                if (buffer[i] === 10) {
                    line++;
                }
            }
        }

        return { file, offset, line };
    }

    /**
     * Watches the journal for new or changed files and returns filenames sorted by date. An optional starting file
     * can be specified to define the starting point for the watcher. If not specified then the whole journal
     * directory is scanned and all found journal files are returned before starting to watch for changed or new
     * files.
     *
     * @param startFile   - Optional starting file. If not specified then the watcher starts with the oldest available
     *                      journal file.
     * @param abortSignal - Optional abort signal to abort watching.
     * @return New/changed journal files in chronological order.
     */
    private async* watchJournalFiles(startFile: string, abortSignal?: AbortSignal): AsyncGenerator<string> {
        const notifier = new Notifier();
        const queue: string[] = [];
        const initialFiles: string[] = [];
        let ready = false;
        const watcher = chokidar.watch("Journal.*.log", {
            cwd: this.directory,
            depth: 0,
            ignoreInitial: false,
            usePolling: true
        });
        watcher.on("add", file => {
            if (journalTimeCompare(file, startFile) >= 0) {
                if (ready) {
                    if (startFile != null) {
                        // Also push the current file again in case the new file is reported before the change in the
                        // current file is reported. Otherwise we would loose the new lines in the current file and
                        // switch directly to the new file
                        queue.push(startFile);
                    }
                    queue.push(file);
                    notifier.notify();
                    startFile = file;
                } else {
                    initialFiles.push(file);
                }
            }
        });
        watcher.on("change", file => {
            if (ready && journalTimeCompare(file, startFile) >= 0) {
                queue.push(file);
                notifier.notify();
            }
        });
        watcher.on("ready", () => {
            ready = true;
            initialFiles.sort(journalTimeCompare);
            for (startFile of initialFiles) {
                queue.push(startFile);
            }
            notifier.notify();
        });
        watcher.on("error", error => {
            notifier.abort(error);
        });

        let aborted = false;
        abortSignal?.addEventListener("abort", () => {
            void watcher.close();
            aborted = true;
            notifier.notify();
        });

        try {
            while (!aborted) {
                const value = queue.shift();
                if (value != null) {
                    yield value;
                } else {
                    await notifier.wait();
                }
            }
        } finally {
            void watcher.close();
        }
    }

    /**
     * Lists journal files. An optional starting file can be specified to define the starting point for the watcher.
     * If not specified then the whole journal directory is scanned and all found files are returned..
     *
     * @param startFile - Optional starting file. If not specified then the reader starts with the oldest available
     *                    journal file.
     * @return The found journal files.
     */
    private async listJournalFiles(startFile: string): Promise<string[]> {
        const matches = await promisify(glob)("Journal.*.log", { cwd: this.directory });
        return matches.sort(journalTimeCompare).filter(file => journalTimeCompare(file, startFile) >= 0);
    }

    /**
     * Parses a single journal event line. Additionally to parsing the string into a JSON object this function also
     * updates old properties in the journal event to new ones if needed.
     *
     * @param line - The JSON line to parse.
     * @return The parsed journal event.
     */
    private parseJournalEvent(line: string): AnyJournalEvent {
        const json = JSON.parse(line) as AnyJournalEvent;
        updateJournalEvent(json);
        return json;
    }

    /**
     * Reads the journal from the given directory.
     *
     * @param directory - The journal directory.
     * @param options   - Optional journal reading options.
     * @return Stream of journal events.
     */
    private async* createGenerator(watch: boolean, abortSignal?: AbortSignal): AsyncGenerator<AnyJournalEvent> {
        // Get the list of journal files to read/watch. In watch mode this is a generator which produces changed/new
        // files until it is aborted
        const files = watch
            ? this.watchJournalFiles(this.position.file, abortSignal)
            : await this.listJournalFiles(this.position.file);

        // Line reader is re-used until a new journal file is opened
        let lineReader: LineReader | null = null;

        // Iterate over all journal files in chronological order. In watch mode, when the last line of the last file
        // has been read this loop waits until the files generator reports the current journal file again when it has
        // been changed or a new journal file was found. Reading is then continued at this point.
        for await (const file of files) {
            // Create line reader or replace it when new journal file has been opened
            if (lineReader == null || file !== this.position.file) {
                lineReader = new LineReader(
                    path.join(this.directory, file), file === this.position.file ? this.position.offset : 0,
                    file === this.position.file ? this.position.line : 1);
            }

            // Iterate over all lines of the journal file
            for await (const line of lineReader) {
                try {
                    // Parse the journal event and yield it
                    yield this.parseJournalEvent(line);
                } catch (error) {
                    throw new JournalError(`Parse error in ${this.position.file}:${this.position.line}: `
                        + `${getErrorMessage(error)}: ${line.trim()}`);
                }

                // Remember position of next journal event
                this.position = { file, offset: lineReader.getOffset(), line: lineReader.getLine() };
            }
        }
    }

    /**
     * Returns async iterator for the journal events.
     *
     * @return Async iterator for the events in this journal.
     */
    public [Symbol.asyncIterator](): AsyncGenerator<AnyJournalEvent> {
        return this.generator;
    }

    /**
     * Returns the next event from the journal. When end of journal is reached then in watch mode this method waits
     * until a new event arrives. When not in watch mode or when watching is aborted this method returns null when no
     * more events are available.
     *
     * @return The next journal event or null when end is reached.
     */
    public async next(): Promise<AnyJournalEvent | null> {
        const result = await this.generator.next();
        return result.done === true ? null : result.value;
    }
}