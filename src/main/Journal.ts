/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

// Import events which registers event updates
import "./events/carrier/CarrierNameChange.js";
import "./events/carrier/CarrierStats.js";
import "./events/travel/Docked.js";
import "./events/station/EngineerCraft.js";
import "./events/travel/FSDJump.js";
import "./events/travel/Location.js";
import "./events/exploration/Scan.js";
import "./events/startup/Statistics.js";
import "./events/other/Synthesis.js";

import { open, readdir, readFile, watch } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

import type { AnyJournalEvent, JournalEventName } from "./AnyJournalEvent.js";
import type { Backpack } from "./events/odyssey/Backpack.js";
import type { ExtendedFCMaterials } from "./events/odyssey/FCMaterials.js";
import type { ExtendedModuleInfo } from "./events/other/ModuleInfo.js";
import type { Status } from "./events/other/Status.js";
import type { ExtendedMarket } from "./events/station/Market.js";
import type { ExtendedOutfitting } from "./events/station/Outfitting.js";
import type { ExtendedShipyard } from "./events/station/Shipyard.js";
import type { ExtendedNavRoute } from "./events/travel/NavRoute.js";
import { JournalError } from "./JournalError.js";
import { type JournalEvent, updateJournalEvent } from "./JournalEvent.js";
import type { JournalPosition, NamedJournalPosition } from "./JournalPosition.js";
import { sleep } from "./util/async.js";
import { getErrorMessage, toError } from "./util/error.js";
import { isDirectory, isPathReadable } from "./util/fs.js";
import { LineReader } from "./util/LineReader.js";
import { Notifier } from "./util/Notifier.js";

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

/** Regular expression to match the name of a journal file. */
const journalFileRegExp = /^Journal\.\d{12}|\d{4}-\d{2}-\d{2}T\d{6}\.\d{2}\.log$/;

/**
 * Checks if given filename is a journal file.
 *
 * @param The filename to check.
 * @return True if filename is a journal file, false it not.
 */
function isJournalFile(filename: string): boolean {
    return journalFileRegExp.test(filename);
}

/**
 * Options for reading journal files.
 */
export interface JournalOptions {
    /** Optional journal directory. If not specified then automatically determined by looking in popular spots. */
    directory?: string;

    /**
     * Optional position within the journal where to start at. Can be either a specific journal position or a string with the following meaning:
     *
     * - "start"     : Indicates the very beginning of the earliest journal file.
     * - "end"       : Indicates the end of the latest journal file. So only future events will be read (only makes sense in watch mode)
     * - event name  : Any other string is treated as a journal event name. Indicates the last (newest) position of the given event in the journal. When
     *                 specifying 'FSDJump" for example then journal reading begins at the last FSDJump event found in the game. If there is no FSDJump in
     *                 the whole journal then reading begins a the end of the journal (same as specifying position "end").
     *
     * Defaults to "start".
     */
    position?: JournalPosition | NamedJournalPosition;

    /**
     * Set to true to watch the journal for new events. False (default) just reads the existing journal events and
     * does not wait for new ones.
     */
    watch?: boolean;
}

/**
 * JSON reviver function which converts numbers of ID properties (property names ending with 'ID' or 'Address') to bigint if needed.
 *
 * @param key     - The JSON property key.
 * @param value   - The parsed JSON property value.
 * @param context - The reviver context containing the raw JSON source string.
 * @returns The already parsed JSON property value if suitable or the raw source converted into a bigint.
 */
function jsonReviver(key: string, value: unknown, context?: { source: string }): unknown {
    if (context != null && typeof value === "number" && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {
        const source = context.source;
        if (key.endsWith("ID") || key.endsWith("Address")) {
            return BigInt(source);
        } else if (/^[-+]?\d+$/.test(source)) {
            throw new JournalError(`Value of property '${key}' looks like a bigint (${source}) but was parsed as an imprecise number (${value})`);
        }
    }
    return value;
}

/**
 * Journal reader/watcher.
 *
 * Reads or watches a journal directory. It implements the AsyncIterable interface so for reading/watching the
 * journal you simply iterate of the instance of this class with a for..of loop for example. If you prefer you can
 * also use the {@link next} method to read the next event from the journal until this method returns null to indicate
 * the end of the journal.
 *
 * In watch mode the iteration does not end and is continued every time a new event is appended to the journal by the
 * game. Watch mode can be stopped by calling the {@link close} method. Iteration loops will end when journal is closed.
 */
export class Journal implements AsyncIterable<AnyJournalEvent> {
    /** The journal directory. */
    private readonly directory: string;

    /** The current journal position pointing to the next event to read. */
    private position: JournalPosition;

    /** The generator used for reading journal events. */
    private readonly generator: AsyncGenerator<AnyJournalEvent>;

    /** The currently open line reader. Null if currently none open. */
    private lineReader: LineReader | null = null;

    /** Controller used to abort watchers when journal is closed. */
    private readonly abortController: AbortController;

    /**
     * Creates journal read from given directory at given position.
     *
     * @param directory - The journal directory.
     * @param position  - The position to start reading from.
     * @param watch     - True to watch journal, false to just read it.
     */
    private constructor(directory: string, position: JournalPosition, watch: boolean) {
        this.directory = directory;
        this.position = position;
        this.abortController = new AbortController();
        this.generator = this.createGenerator(watch);
    }

    /**
     * Opens the journal.
     */
    public static async open({ directory, position = "start", watch = false }: JournalOptions = {}): Promise<Journal> {
        directory ??= await this.findDirectory();
        if (position === "start") {
            position = { file: "", offset: 0, line: 1 };
        } else if (position === "end") {
            position = await this.findEnd(directory);
        } else if (typeof position === "string") {
            position = await this.findLastEvent(directory, position);
        } else {
            position = { ...position };
        }
        return new Journal(directory, position, watch);
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
    public static async findDirectory(): Promise<string> {
        const nativeHome = homedir();
        const protonHome = ".local/share/Steam/steamapps/compatdata/359320/pfx/drive_c/users/steamuser";
        const eliteDir = "Saved Games/Frontier Developments/Elite Dangerous";
        const candidates = [
            join(nativeHome, eliteDir),
            join(nativeHome, protonHome, eliteDir)
        ];
        const dirFromEnv = process.env["ED_JOURNAL_DIR"];
        if (dirFromEnv != null) {
            // Check ED_JOURNAL_DIR environment variable first if present
            candidates.unshift(dirFromEnv);
        }
        for (const candidate of candidates) {
            if (await isPathReadable(candidate) && await isDirectory(candidate)) {
                return candidate;
            }
        }
        throw new JournalError("Unable to find Elite Dangerous Journal directory");
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
     * Closes the journal by stopping the watcher (if any) and closing the line reader.
     */
    public async close(): Promise<void> {
        this.abortController.abort();
        if (this.lineReader != null) {
            await this.lineReader.close();
            this.lineReader = null;
        }
    }

    /**
     * Finds the last position of the given event in the latest file of the journal and returns it. Returns end of journal if the latest journal file
     * does not contain this event.
     *
     * @param directory - The journal directory.
     * @param eventName - The event name to look for.
     * @return Last position of given event in latest journal file or end of journal if not found.
     */
    public static async findLastEvent(directory: string, eventName: JournalEventName): Promise<JournalPosition> {
        const files = (await readdir(directory)).filter(isJournalFile).sort(journalTimeCompare).reverse();
        let lastEventPosition: JournalPosition | null = null;
        let lastPosition: JournalPosition = { file: "", offset: 0, line: 1 };
        for (const file of files) {
            await using lineReader = await LineReader.create(join(directory, file));
            lastPosition = { file, offset: lineReader.getOffset(), line: lineReader.getLine() };
            for await (const line of lineReader) {
                try {
                    const json = JSON.parse(line, jsonReviver) as AnyJournalEvent;
                    updateJournalEvent(json);
                    if (json.event === eventName) {
                        lastEventPosition = lastPosition;
                    }
                    lastPosition = { file, offset: lineReader.getOffset(), line: lineReader.getLine() };
                } catch (error) {
                    throw new JournalError(`Parse error in ${lastPosition.file}:${lastPosition.line}: ${getErrorMessage(error)}: ${line.trim()}`);
                }
            }
            if (lastEventPosition != null) {
                break;
            }
        }
        return lastEventPosition ?? this.findEnd(directory);
    }

    /**
     * Finds the end position of the journal and returns it.
     *
     * @return End position of the journal.
     */
    public static async findEnd(directory: string): Promise<JournalPosition> {
        const filename = (await readdir(directory)).filter(isJournalFile).sort(journalTimeCompare).reverse()[0];
        if (filename == null) {
            // No journal file found, return start as end
            return { file: "", offset: 0, line: 1 };
        }

        // Find last line number and also create the end offset (which is the same as the file size) during the process
        const file = await open(join(directory, filename), "r");
        try {
            const buffer = new Uint8Array(8192);
            let offset = 0;
            let line = 1;
            let read: number;
            while ((read = (await file.read({ buffer })).bytesRead) > 0) {
                offset += read;
                for (let i = 0; i < read; i++) {
                    if (buffer[i] === 10) {
                        line++;
                    }
                }
            }
            return { file: filename, offset, line };
        } finally {
            await file.close();
        }
    }

    /**
     * Watches the journal for new or changed files and returns filenames sorted by date. An optional starting file
     * can be specified to define the starting point for the watcher. If not specified then the whole journal
     * directory is scanned and all found journal files are returned before starting to watch for changed or new
     * files.
     *
     * @param startFile - Optional starting file. If not specified then the watcher starts with the oldest available
     *                    journal file.
     * @return New/changed journal files in chronological order.
     */
    private async *watchJournalFiles(startFile: string): AsyncGenerator<string> {
        const signal = this.abortController.signal;
        const notifier = new Notifier(signal);
        const directory = resolve(this.directory);
        const files: string[] = [];
        let error: Error | null = null;
        let initialized = false;

        // Monitors journal directory for changes. This starts immediately, even when initial directories are still read, so we don't miss any changed or
        // new file. When initialization is not done yet, then changed/new file is just recorded and taken into account during initialization. If
        // initialization is done then changed/new files are reported right away.
        const journalDirMonitor = (async () => {
            try {
                for await (const event of watch(directory, { signal })) {
                    const filename = event.filename;
                    if (filename != null && isJournalFile(filename)) {
                        if (initialized) {
                            if (journalTimeCompare(filename, startFile) >= 0) {
                                startFile = filename;
                                files.push(filename);
                                notifier.notify();
                            }
                        } else {
                            files.push(filename);
                        }
                    }
                }
            } catch (e) {
                error = toError(e);
                notifier.notify();
            }
        })();

        // Asynchronous initialization. Reads all existing journal files and sorts them. While reading the directory the watcher can already contribute
        // new/changed files.
        const asyncInit = (async () => {
            try {
                for (const file of await this.listJournalFiles(startFile)) {
                    if (signal.aborted) {
                        break;
                    }
                    files.push(file);
                }
                files.sort(journalTimeCompare);
                startFile = files.at(-1) ?? "";
                initialized = true;
                notifier.notify();
            } catch (e) {
                error = toError(e);
                notifier.notify();
            }
        })();

        // Waits for reported new/changed files and yields them. Aborts on error and simply exits when user aborts the watcher.
        while (!signal.aborted) {
            if (error != null) {
                throw error as Error;
            }
            const nextFile = files.shift();
            if (nextFile != null) {
                yield nextFile;
            } else {
                await notifier.wait();
            }
        }

        // Await background processes to make sure they existed correctly
        await asyncInit;
        await journalDirMonitor;
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
        return (await readdir(this.directory))
            .filter(filename => isJournalFile(filename) && journalTimeCompare(filename, startFile) >= 0)
            .sort(journalTimeCompare);
    }

    /**
     * Parses a single journal event line. Additionally to parsing the string into a JSON object this function also
     * updates old properties in the journal event to new ones if needed.
     *
     * @param line - The JSON line to parse.
     * @return The parsed journal event.
     */
    private parseJournalEvent(line: string): AnyJournalEvent {
        const json = JSON.parse(line, jsonReviver) as AnyJournalEvent;
        updateJournalEvent(json);
        return json;
    }

    /**
     * Creates the journal event generator.
     *
     * @param watch - True to watch the journal instead of just reading it.
     * @return The created journal event generator.
     */
    private async *createGenerator(watch: boolean): AsyncGenerator<AnyJournalEvent> {
        // Get the list of journal files to read/watch. In watch mode this is a generator which produces changed/new
        // files until journal is closed.
        const files = watch
            ? this.watchJournalFiles(this.position.file)
            : await this.listJournalFiles(this.position.file);

        const signal = this.abortController.signal;

        // Iterate over all journal files in chronological order. In watch mode, when the last line of the last file
        // has been read this loop waits until the files generator reports the current journal file again when it has
        // been changed or a new journal file was found. Reading is then continued at this point.
        for await (const file of files) {
            // Create line reader or replace it when new journal file has been opened
            let lineReader = this.lineReader;
            if (lineReader == null || file !== this.position.file) {
                if (lineReader != null) {
                    await lineReader.close();
                }
                lineReader = this.lineReader = await LineReader.create(
                    join(this.directory, file), file === this.position.file ? this.position.offset : 0,
                    file === this.position.file ? this.position.line : 1);
            }

            // Iterate over all lines of the journal file
            for await (const line of lineReader) {
                if (signal.aborted) {
                    break;
                }

                // Remember current journal position for error messages
                const position = this.position;

                // Set position of next journal event
                this.position = { file, offset: lineReader.getOffset(), line: lineReader.getLine() };

                try {
                    // Parse the journal event and yield it
                    yield this.parseJournalEvent(line);
                } catch (error) {
                    throw new JournalError(`Parse error in ${position.file}:${position.line}: `
                        + `${getErrorMessage(error)}: ${line.trim()}`);
                }
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
     * until a new event arrives. When not in watch mode or when journal is closed this method returns null when no
     * more events are available.
     *
     * @return The next journal event or null when end is reached.
     */
    public async next(): Promise<AnyJournalEvent | null> {
        const result = await this.generator.next();
        return result.done === true ? null : result.value;
    }

    /**
     * Reads the given JSON file, parses it as at a journal event and returns it.
     *
     * @param filename - The filename of the JSON file to read. Relative to journal directory.
     * @return The parsed journal event. Null when file is not present.
     */
    private async readFile<T extends JournalEvent>(filename: string): Promise<T | null> {
        const path = join(this.directory, filename);
        if (!(await isPathReadable(path))) {
            return null;
        }
        const result = (await readFile(path)).toString();
        if (!result.startsWith("{") || !result.endsWith("}\r\n")) {
            // JSON file is not fully written yet. Wait a little bit and try again.
            await sleep(25);
            return this.readFile(filename);
        }

        return JSON.parse(result, jsonReviver) as T;
    }

    /**
     * Watches the given JSON file for changes and reports any new content. It always reports the current content as
     * first change.
     *
     * @param filename - The filename of the JSON file to read and watch. Relative to journal directory.
     * @return Async iterator watching content changes.
     */
    private async *watchFile(filename: string): AsyncGenerator<string> {
        const signal = this.abortController.signal;
        yield filename;
        try {
            for await (const event of watch(this.directory, { signal })) {
                if (event.filename === filename) {
                    yield filename;
                }
            }
        } catch {
            // Ignoring watch abort, generator still stops yielding values
        }
    }

    private async *watchFileContent<T extends JournalEvent>(filename: string): AsyncGenerator<T> {
        for await (const file of this.watchFile(filename)) {
            const content = await this.readFile<T>(file);
            if (content != null) {
                yield content;
            }
        }
    }

    /**
     * Returns the current backpack inventory read from the Backpack.json file.
     *
     * @return The current backpack inventory. Null if Backpack.json file does not exist or is not readable.
     */
    public readBackpack(): Promise<Backpack | null> {
        return this.readFile("Backpack.json");
    }

    /**
     * Watches the Backpack.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching backpack inventory changes.
     */
    public watchBackpack(): AsyncGenerator<Backpack> {
        return this.watchFileContent("Backpack.json");
    }

    /**
     * Returns the current cargo data read from the Cargo.json file.
     *
     * @return The current cargo data. Null if Cargo.json file does not exist or is not readable.
     */
    public readCargo(): Promise<Backpack | null> {
        return this.readFile("Cargo.json");
    }

    /**
     * Watches the Cargo.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching cargo changes.
     */
    public watchCargo(): AsyncGenerator<Backpack> {
        return this.watchFileContent("Cargo.json");
    }

    /**
     * Returns the current fleet carrier materials data read from the FCMaterials.json file.
     *
     * @return The current fleet carrier materials data. Null if FCMaterials.json file does not exist or
     *         is not readable.
     */
    public readFCMaterials(): Promise<ExtendedFCMaterials | null> {
        return this.readFile("FCMaterials.json");
    }

    /**
     * Watches the FCMaterials.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching fleet carrier materials data changes.
     */
    public watchFCMaterials(): AsyncGenerator<ExtendedFCMaterials> {
        return this.watchFileContent("FCMaterials.json");
    }

    /**
     * Returns the current market data read from the Market.json file.
     *
     * @return The current market data. Null if Market.json file does not exist or is not readable.
     */
    public readMarket(): Promise<ExtendedMarket | null> {
        return this.readFile("Market.json");
    }

    /**
     * Watches the Market.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching market data changes.
     */
    public watchMarket(): AsyncGenerator<ExtendedMarket> {
        return this.watchFileContent("Market.json");
    }

    /**
     * Returns the current modules info read from the ModulesInfo.json file.
     *
     * @return The current modules info. Null if ModulesInfo.json file does not exist or is not readable.
     */
    public readModulesInfo(): Promise<ExtendedModuleInfo | null> {
        return this.readFile("ModulesInfo.json");
    }

    /**
     * Watches the ModulesInfo.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching modules info changes.
     */
    public watchModulesInfo(): AsyncGenerator<ExtendedModuleInfo> {
        return this.watchFileContent("ModulesInfo.json");
    }

    /**
     * Returns the current nav route read from the NavRoute.json file.
     *
     * @return The current nav route data. Null if NavRoute.json file does not exist or is not readable.
     */
    public readNavRoute(): Promise<ExtendedNavRoute | null> {
        return this.readFile("NavRoute.json");
    }

    /**
     * Watches the NavRoute.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching nav route data changes.
     */
    public watchNavRoute(): AsyncGenerator<ExtendedNavRoute> {
        return this.watchFileContent("NavRoute.json");
    }

    /**
     * Returns the current outfitting data read from the Outfitting.json file.
     *
     * @return The current outfitting data. Null if Outfitting.json file does not exist or is not readable.
     */
    public readOutfitting(): Promise<ExtendedOutfitting | null> {
        return this.readFile("Outfitting.json");
    }

    /**
     * Watches the Outfitting.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching outfitting data changes.
     */
    public watchOutfitting(): AsyncGenerator<ExtendedOutfitting> {
        return this.watchFileContent("Outfitting.json");
    }

    /**
     * Returns the current contents of the ship locker from the ShipLocker.json file.
     *
     * @return The current ship locker content. Null if ShipLocker.json file does not exist or is not readable.
     */
    public readShipLocker(): Promise<ExtendedShipyard | null> {
        return this.readFile("ShipLocker.json");
    }

    /**
     * Watches the ShipLocker.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching ship locker content changes.
     */
    public watchShipLocker(): AsyncGenerator<ExtendedShipyard> {
        return this.watchFileContent("ShipLocker.json");
    }

    /**
     * Returns the current shipyard data read from the Shipyard.json file.
     *
     * @return The current shipyard data. Null if Shipyard.json file does not exist or is not readable.
     */
    public readShipyard(): Promise<ExtendedShipyard | null> {
        return this.readFile("Shipyard.json");
    }

    /**
     * Watches the Shipyard.json file for changes and reports any new data. It always reports the current data as
     * first change.
     *
     * @return Async iterator watching shipyard data changes.
     */
    public watchShipyard(): AsyncGenerator<ExtendedShipyard> {
        return this.watchFileContent("Shipyard.json");
    }

    /**
     * Returns the current status read from the Status.json file.
     *
     * @return The current status. Null if Status.json file does not exist or is not readable.
     */
    public readStatus(): Promise<Status | null> {
        return this.readFile("Status.json");
    }

    /**
     * Watches the Status.json file for changes and reports any new status. It always reports the current status as
     * first change.
     *
     * @return Async iterator watching status changes.
     */
    public watchStatus(): AsyncGenerator<Status> {
        return this.watchFileContent("Status.json");
    }
}
