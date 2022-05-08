import { chmod, mkdir, mkdtemp, open, rm } from "fs/promises";
import { copy } from "fs-extra";
import { tmpdir } from "os";
import { join } from "path";

import type { AnyJournalEvent } from "../main";
import { Journal } from "../main/Journal";
import { JournalError } from "../main/JournalError";

const journalDir = join(__dirname, "../../src/test/data/journal");

async function sleep(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

async function withTmpHome(action: (home: string) => Promise<void>): Promise<void> {
    const origHome = process.env["HOME"];
    const origUserProfile = process.env["USERPROFILE"];
    const home = await mkdtemp(join(tmpdir(), "ed-journal-test-"));
    process.env["HOME"] = home;
    process.env["USERPROFILE"] = home;
    try {
        await action(home);
    } finally {
        process.env["HOME"] = origHome;
        process.env["USERPROFILE"] = origUserProfile;
        await rm(home, { recursive: true });
    }
}

class JournalWriter {
    private constructor(public readonly directory: string) {}

    public static async create(source: string): Promise<JournalWriter> {
        const directory = await mkdtemp(join(tmpdir(), "ed-journal-test-"));
        await copy(source, directory);
        return new JournalWriter(directory);
    }

    public async write(filename: string, line: string): Promise<void> {
        const file = await open(join(this.directory, filename), "as");
        try {
            await file.write(line + "\n");
        } finally {
            await file.close();
        }
    }

    public async done(): Promise<void> {
        await rm(this.directory, { recursive: true });
    }
}

describe("Journal", () => {
    it("reads a journal in chronological order", async () => {
        const events: AnyJournalEvent[] = [];
        const journal = await Journal.open({ directory: journalDir });
        try {
            for await (const event of journal) {
                events.push(event);
            }
            expect(events).toMatchSnapshot();
            expect(journal.getPosition()).toEqual({
                file: "Journal.2023-01-01T000000.01.log",
                offset: 222,
                line: 3
            });
        } finally {
            await journal.close();
        }
    });

    it("reads a journal starting at given position", async () => {
        const events: AnyJournalEvent[] = [];
        const journal = await Journal.open({
            directory: journalDir,
            position: { file: "Journal.210101000000.01.log", offset: 163, line: 2 }
        });
        try {
            for await (const record of journal) {
                events.push(record);
            }
            expect(events).toMatchSnapshot();
            expect(journal.getPosition()).toEqual({
                file: "Journal.2023-01-01T000000.01.log",
                offset: 222,
                line: 3
            });
        } finally {
            await journal.close();
        }
    });

    it("watches a journal in chronological order", async () => {
        const writer = await JournalWriter.create(journalDir);
        try {
            const events: AnyJournalEvent[] = [];
            const promise = (async () => {
                const journal = await Journal.open({ directory: writer.directory, watch: true });
                try {
                    for await (const event of journal) {
                        events.push(event);
                        if (event.event === "Died") {
                            break;
                        }
                    }
                } finally {
                    await journal.close();
                }
            })();

            // Write line into existing file
            await writer.write("Journal.2023-01-01T000000.01.log",
                `{ "timestamp":"2023-01-01T00:00:02Z", "event":"Continued", "Part": 2 }`);

            // Write line into new file
            await writer.write("Journal.2023-01-01T000000.02.log",
                `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);

            await promise;
            expect(events).toMatchSnapshot();
        } finally {
            await writer.done();
        }
    });

    it("watches a journal starting at given position", async () => {
        const writer = await JournalWriter.create(journalDir);
        try {
            const records: AnyJournalEvent[] = [];
            const promise = (async () => {
                const journal = await Journal.open({
                    directory: writer.directory,
                    watch: true,
                    position: { file: "Journal.210101000000.01.log", offset: 163, line: 2 }
                });
                try {
                    for await (const record of journal) {
                        records.push(record);
                        if (record.event === "Died") {
                            break;
                        }
                    }
                } finally {
                    await journal.close();
                }
            })();

            // Write line into existing file
            await writer.write("Journal.2023-01-01T000000.01.log",
                `{ "timestamp":"2023-01-01T00:00:02Z", "event":"Continued", "Part": 2 }`);

            // Write line into new file
            await writer.write("Journal.2023-01-01T000000.02.log",
                `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);

            await promise;
            expect(records).toMatchSnapshot();
        } finally {
            await writer.done();
        }
    });

    it("can watch new journal events only", async () => {
        const writer = await JournalWriter.create(journalDir);
        try {
            const records: AnyJournalEvent[] = [];
            const promise = (async () => {
                const journal = await Journal.open({
                    directory: writer.directory,
                    watch: true,
                    position: "end"
                });
                try {
                    for await (const event of journal) {
                        records.push(event);
                        if (event.event === "Died") {
                            break;
                        }
                    }
                } finally {
                    await journal.close();
                }
            })();

            await sleep(100);

            // Write line into existing file
            await writer.write("Journal.2023-01-01T000000.01.log",
                `{ "timestamp":"2023-01-01T00:00:02Z", "event":"Continued", "Part": 2 }`);

            await sleep(100);

            // Write line into new file
            await writer.write("Journal.2023-01-01T000000.02.log",
                `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);

            await promise;
            expect(records).toMatchSnapshot();
        } finally {
            await writer.done();
        }
    });

    it("throws error when watching inaccessible directory", async () => {
        const parentDirectory = await mkdtemp(join(tmpdir(), "ed-journal-test-"));
        try {
            const journalDirectory = join(parentDirectory, "journal");
            await chmod(parentDirectory, 0);
            const journal = await Journal.open({
                directory: journalDirectory,
                watch: true
            });
            try {
                const promise = (async () => {
                    for await (const event of journal) {
                        expect(event).not.toBeDefined();
                    }
                })();
                await expect(promise).rejects.toThrow();
            } finally {
                await journal.close();
            }
        } finally {
            await rm(parentDirectory, { recursive: true });
        }
    });

    it("throws error when reading broken journal", async () => {
        const journal = await Journal.open({ directory: join(__dirname, "../../src/test/data/broken") });
        try {
            const promise = (async () => {
                for await (const event of journal) {
                    expect(event).toBeDefined();
                }
            })();
            await expect(promise).rejects.toThrow("Parse error in Journal.2023-01-01T000000.01.log:2: "
                + "Unexpected token ] in JSON at position 38: { \"timestamp\":\"2023-01-01T00:00:01Z\", ]");
        } finally {
            await journal.close();
        }
    });

    describe("findDirectory", () => {
        it("returns journal directory specified by ED_JOURNAL_DIR env variable", async () => {
            const origEnv = process.env["ED_JOURNAL_DIR"];
            try {
                process.env["ED_JOURNAL_DIR"] = journalDir;
                expect(await Journal.findDirectory()).toBe(journalDir);
            } finally {
                process.env["ED_JOURNAL_DIR"] = origEnv;
            }
        });
        it("returns journal directory on windows if present", async () => {
            await withTmpHome(async home => {
                const journalDir = join(home, "Saved Games/Frontier Developments/Elite Dangerous");
                await mkdir(journalDir, { recursive: true });
                expect(await Journal.findDirectory()).toBe(journalDir);
            });
        });
        it("returns journal directory on Linux (Proton) if present", async () => {
            await withTmpHome(async home => {
                const journalDir = join(home,
                    ".local/share/Steam/steamapps/compatdata/359320/pfx/drive_c/users/steamuser",
                    "Saved Games/Frontier Developments/Elite Dangerous");
                await mkdir(journalDir, { recursive: true });
                expect(await Journal.findDirectory()).toBe(journalDir);
            });
        });
        it("throws error when journal directory was not found", async () => {
            await withTmpHome(async () => {
                await expect(Journal.findDirectory()).rejects.toThrow(
                    new JournalError("Unable to find Elite Dangerous Journal directory"));
            });
        });
    });

    describe("create", () => {
        it("automatically determines journal directory if not specified", async () => {
            const origEnv = process.env["ED_JOURNAL_DIR"];
            try {
                process.env["ED_JOURNAL_DIR"] = journalDir;
                const journal = await Journal.open();
                try {
                    expect(journal.getDirectory()).toBe(journalDir);
                } finally {
                    await journal.close();
                }
            } finally {
                process.env["ED_JOURNAL_DIR"] = origEnv;
            }
        });
        it("opens journal in given directory", async () => {
            const journal = await Journal.open({ directory: __dirname });
            try {
                expect(journal.getDirectory()).toBe(__dirname);
            } finally {
                await journal.close();
            }
        });
    });

    describe("findEnd", () => {
        it("returns end position of journal", async () => {
            expect(await Journal.findEnd(journalDir)).toEqual(
                { file: "Journal.2023-01-01T000000.01.log", offset: 222, line: 3 });
        });
        it("returns start position when no journal find found", async () => {
            expect(await Journal.findEnd(__dirname)).toEqual({ file: "", offset: 0, line: 1 });
        });
    });

    describe("next", () => {
        it("returns the next event in the journal", async () => {
            const journal = await Journal.open({
                directory: journalDir,
                position: { file: "Journal.2022-01-01T000000.01.log", offset: 163, line: 2 }
            });
            try {
                expect(await journal.next()).toEqual({ "timestamp": "2022-01-01T00:00:01Z", "event": "Shutdown" });
                expect(await journal.next()).toEqual({ "timestamp": "2023-01-01T00:00:00Z", "event": "Fileheader",
                    "part": 1, "language": "English\\UK", "Odyssey": true, "gameversion": "4.0.0.600",
                    "build": "r271793/r0 " });
                expect(await journal.next()).toEqual({ "timestamp": "2023-01-01T00:00:01Z", "event": "Shutdown" });
                expect(await journal.next()).toBeNull();
                expect(await journal.next()).toBeNull();
            } finally {
                await journal.close();
            }
        });
        it("waits for next event in watch mode", async () => {
            const writer = await JournalWriter.create(journalDir);
            try {
                const journal = await Journal.open({
                    directory: writer.directory,
                    watch: true,
                    position: { file: "Journal.2023-01-01T000000.01.log", offset: 163, line: 2 }
                });
                try {
                    expect(await journal.next()).toEqual({ "timestamp": "2023-01-01T00:00:01Z", "event": "Shutdown" });
                    const promise = journal.next();
                    await sleep(50);
                    await writer.write("Journal.2023-01-01T000000.02.log",
                        `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);
                    expect(await promise).toEqual({ "timestamp": "2023-01-01T00:00:03Z", "event": "Died" });
                } finally {
                    await journal.close();
                }
            } finally {
                await writer.done();
            }
        });
    });
});
