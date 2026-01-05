
import { appendFileSync, writeFileSync } from "node:fs";
import { appendFile, chmod, cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, it } from "node:test";

import type { AnyJournalEvent } from "../main/AnyJournalEvent.ts";
import type { Backpack } from "../main/events/odyssey/Backpack.ts";
import type { ExtendedFCMaterials } from "../main/events/odyssey/FCMaterials.ts";
import type { ShipLocker } from "../main/events/odyssey/ShipLocker.ts";
import type { ExtendedModuleInfo } from "../main/events/other/ModuleInfo.ts";
import { Flag, Flag2, GuiFocus, type Status } from "../main/events/other/Status.ts";
import type { Cargo } from "../main/events/startup/Cargo.ts";
import type { ExtendedMarket } from "../main/events/station/Market.ts";
import type { ExtendedOutfitting } from "../main/events/station/Outfitting.ts";
import type { ExtendedShipyard } from "../main/events/station/Shipyard.ts";
import type { ExtendedNavRoute } from "../main/events/travel/NavRoute.ts";
import { Journal } from "../main/Journal.ts";
import { JournalError } from "../main/JournalError.ts";
import type { JournalEvent } from "../main/JournalEvent.ts";
import { sleep } from "../main/util/async.ts";
import { assertDefined, assertEquals, assertNull, assertSame, assertThrowWithMessage, assertUndefined } from "@kayahr/assert";

const journalDir = "src/test/data/journal";

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
    public readonly directory: string;

    private constructor(directory: string) {
        this.directory = directory;
    }

    public static async create(source?: string): Promise<JournalWriter> {
        const directory = await mkdtemp(join(tmpdir(), "ed-journal-test-"));
        if (source != null) {
            await cp(source, directory, { recursive: true });
        }
        return new JournalWriter(directory);
    }

    public async append(filename: string, line: string): Promise<void> {
        await appendFile(join(this.directory, filename), `${line}\r\n`, { flush: true });
    }

    public appendSync(filename: string, line: string): void {
        appendFileSync(join(this.directory, filename), `${line}\r\n`, { flush: true });
    }

    public async write(filename: string, line: string): Promise<void> {
        await writeFile(join(this.directory, filename), `${line}\r\n`, { flush: true });
    }

    public writeSync(filename: string, line: string): void {
        writeFileSync(join(this.directory, filename), `${line}\r\n`, { flush: true });
    }

    public async done(): Promise<void> {
        await rm(this.directory, { recursive: true });
    }
}

describe("Journal", () => {
    it("reads a journal in chronological order", async (context) => {
        const events: AnyJournalEvent[] = [];
        const journal = await Journal.open({ directory: journalDir, position: "start" });
        try {
            for await (const event of journal) {
                events.push(event);
            }
            context.assert.snapshot(events);
            assertEquals(journal.getPosition(), {
                file: "Journal.2023-01-01T000000.01.log",
                offset: 222,
                line: 3
            });
        } finally {
            await journal.close();
        }
    });

    it("reads a journal starting at given position", async (context) => {
        const events: AnyJournalEvent[] = [];
        const journal = await Journal.open({
            directory: journalDir,
            position: { file: "Journal.210101000000.01.log", offset: 163, line: 2 }
        });
        try {
            for await (const record of journal) {
                events.push(record);
            }
            context.assert.snapshot(events);
            assertEquals(journal.getPosition(), {
                file: "Journal.2023-01-01T000000.01.log",
                offset: 222,
                line: 3
            });
        } finally {
            await journal.close();
        }
    });

    it("watches a journal in chronological order", async (context) => {
        const writer = await JournalWriter.create(journalDir);
        try {
            const events: AnyJournalEvent[] = [];
            const journal = await Journal.open({ directory: writer.directory, watch: true, position: "start" });
            const promise = (async () => {
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
            await writer.append("Journal.2023-01-01T000000.01.log",
                `{ "timestamp":"2023-01-01T00:00:02Z", "event":"Continued", "Part": 2 }`);

            // Write line into new file
            await writer.write("Journal.2023-01-01T000000.02.log",
                `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);

            await promise;
            context.assert.snapshot(events);
        } finally {
            await writer.done();
        }
    });

    it("picks up new journal files changed/created while still initializing the watcher", async (context) => {
        const writer = await JournalWriter.create(journalDir);
        try {
            const events: AnyJournalEvent[] = [];
            const journal = await Journal.open({ directory: writer.directory, watch: true, position: "start" });
            const promise = (async () => {
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
            writer.appendSync("Journal.2023-01-01T000000.01.log",
                `{ "timestamp":"2023-01-01T00:00:02Z", "event":"Continued", "Part": 2 }`);

            // Write line into new file
            writer.writeSync("Journal.2023-01-01T000000.02.log",
                `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);

            await promise;
            context.assert.snapshot(events);
        } finally {
            await writer.done();
        }
    });

    it("watches a journal starting at given position", async (context) => {
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
            await writer.append("Journal.2023-01-01T000000.01.log",
                `{ "timestamp":"2023-01-01T00:00:02Z", "event":"Continued", "Part": 2 }`);

            // Write line into new file
            await writer.append("Journal.2023-01-01T000000.02.log",
                `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);

            await promise;
            context.assert.snapshot(records);
        } finally {
            await writer.done();
        }
    });

    it("reads a journal starting at given event", async (context) => {
        const records: AnyJournalEvent[] = [];
        const journal = await Journal.open({
            directory: journalDir,
            position: "Commander"
        });
        try {
            for await (const record of journal) {
                records.push(record);
            }
        } finally {
            await journal.close();
        }
        context.assert.snapshot(records);
    });

    it("can watch new journal events only", async (context) => {
        const writer = await JournalWriter.create(journalDir);
        try {
            const records: AnyJournalEvent[] = [];
            const journal = await Journal.open({
                directory: writer.directory,
                watch: true,
                position: "end"
            });
            const promise = (async () => {
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

            // Write line into existing file
            await writer.append("Journal.2023-01-01T000000.01.log",
                `{ "timestamp":"2023-01-01T00:00:02Z", "event":"Continued", "Part": 2 }`);

            // Write line into new file
            await writer.append("Journal.2023-01-01T000000.02.log",
                `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);

            await promise;
            context.assert.snapshot(records);
        } finally {
            await writer.done();
        }
    });

    it("automatically reads ID values as bigint if needed", async () => {
        const journal = await Journal.open({ directory: "src/test/data/events/bigint" });

        // First event needs bigint in CarrierID
        let event = await journal.next();
        assertSame(event?.event, "CarrierStats");
        assertSame((event).CarrierID, 9007199254740992n);

        // Second event does not need bigint in CarrierID
        event = await journal.next();
        assertSame(event?.event, "CarrierStats");
        assertSame((event).CarrierID, 9007199254740991);

        // Third event needs bigint in SystemAddress
        event = await journal.next();
        assertSame(event?.event, "CarrierJump");
        assertSame((event).SystemAddress, 9007199254740992n);

        // Fourth event does not need bigint in SystemAddress
        event = await journal.next();
        assertSame(event?.event, "CarrierJump");
        assertSame((event).SystemAddress, 9007199254740991);

        // Fifth event does not need bigint in FuelLevel causing exception
        await assertThrowWithMessage(() => journal.next(), JournalError, new RegExp(
            "^Parse error in Journal\\.201122113238\\.01\\.log:5: Value of property 'FuelLevel' looks like a "
            + "bigint \\(9007199254740992\\) but was parsed as an imprecise number \\(9007199254740992\\): .*"));
    });

    it("reports lines in correct order when new file is created right before changing the current file", async (context) => {
        const writer = await JournalWriter.create();
        const journal = await Journal.open({ directory: writer.directory, watch: true });
        try {
            const records: AnyJournalEvent[] = [];
            const promise = (async () => {
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
            writer.writeSync("Journal.2025-03-03T000000.01.log", '{ "timestamp":"2025-03-03T00:00:01Z", "event":"Shutdown" }');
            writer.writeSync("Journal.2025-03-03T000000.02.log", '{ "timestamp":"2025-03-03T00:00:03Z", "event":"Died" }');
            writer.appendSync("Journal.2025-03-03T000000.01.log", '{ "timestamp":"2025-03-03T00:00:02Z", "event":"Continued", "Part": 2 }');
            await promise;
            context.assert.snapshot(records);
        } finally {
            await writer.done();
        }
    });

    it("throws error when on read when watching inaccessible directory at specific position", async () => {
        if (process.platform === "win32") {
            // No idea how to test this on windows
            return;
        }
        const parentDirectory = await mkdtemp(join(tmpdir(), "ed-journal-test-"));
        try {
            const journalDirectory = join(parentDirectory, "journal");
            await chmod(parentDirectory, 0);
            const journal = await Journal.open({
                directory: journalDirectory,
                position: { file: "", line: 1, offset: 0 },
                watch: true
            });
            try {
                const promise = (async () => {
                    for await (const event of journal) {
                        assertUndefined(event);
                    }
                })();
                await assertThrowWithMessage(() => promise, Error,/^EACCES: permission denied, watch .*/);
            } finally {
                await journal.close();
            }
        } finally {
            await rm(parentDirectory, { recursive: true });
        }
    });

    it("throws error on open when watching inaccessible directory at start position", async () => {
        if (process.platform === "win32") {
            // No idea how to test this on windows
            return;
        }
        const parentDirectory = await mkdtemp(join(tmpdir(), "ed-journal-test-"));
        try {
            const journalDirectory = join(parentDirectory, "journal");
            await chmod(parentDirectory, 0);
            await assertThrowWithMessage(() => Journal.open({
                directory: journalDirectory,
                position: "start",
                watch: true
            }), Error, /^EACCES: permission denied, scandir .*/);
        } finally {
            await rm(parentDirectory, { recursive: true });
        }
    });

    it("throws error when reading broken journal", async () => {
        const journal = await Journal.open({ directory: "src/test/data/broken" });
        try {
            const promise = (async () => {
                for await (const event of journal) {
                    assertDefined(event);
                }
            })();
            await assertThrowWithMessage(() => promise, JournalError,
                /Parse error in Journal\.2023-01-01T000000\.01\.log:2: Expected double-quoted property name in JSON at position 38 \(line 1 column 39\): \{ "timestamp":"2023-01-01T00:00:01Z", \]/);
        } finally {
            await journal.close();
        }
    });

    describe("findDirectory", () => {
        it("returns journal directory specified by ED_JOURNAL_DIR env variable", async () => {
            const origEnv = process.env["ED_JOURNAL_DIR"];
            try {
                process.env["ED_JOURNAL_DIR"] = journalDir;
                assertSame(await Journal.findDirectory(), journalDir);
            } finally {
                process.env["ED_JOURNAL_DIR"] = origEnv;
            }
        });
        it("returns journal directory on windows if present", async () => {
            await withTmpHome(async home => {
                const journalDir = join(home, "Saved Games/Frontier Developments/Elite Dangerous");
                await mkdir(journalDir, { recursive: true });
                assertSame(await Journal.findDirectory(), journalDir);
            });
        });
        it("returns journal directory on Linux (Proton) if present", async () => {
            await withTmpHome(async home => {
                const journalDir = join(home,
                    ".local/share/Steam/steamapps/compatdata/359320/pfx/drive_c/users/steamuser",
                    "Saved Games/Frontier Developments/Elite Dangerous");
                await mkdir(journalDir, { recursive: true });
                assertSame(await Journal.findDirectory(), journalDir);
            });
        });
        it("throws error when journal directory was not found", async () => {
            await withTmpHome(async () => {
                await assertThrowWithMessage(() => Journal.findDirectory(), JournalError, "Unable to find Elite Dangerous Journal directory");
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
                    assertSame(journal.getDirectory(), journalDir);
                } finally {
                    await journal.close();
                }
            } finally {
                process.env["ED_JOURNAL_DIR"] = origEnv;
            }
        });
        it("opens journal in given directory", async () => {
            const journal = await Journal.open({ directory: "src/test" });
            try {
                assertSame(journal.getDirectory(), "src/test");
            } finally {
                await journal.close();
            }
        });
    });

    describe("findEnd", () => {
        it("returns end position of journal", async () => {
            assertEquals(await Journal.findEnd(journalDir),
                { file: "Journal.2023-01-01T000000.01.log", offset: 222, line: 3 });
        });
        it("returns start position when no journal file found", async () => {
            assertEquals(await Journal.findEnd("src/test"), { file: "", offset: 0, line: 1 });
        });
    });

    describe("findStart", () => {
        it("returns start position of journal", async () => {
            assertEquals(await Journal.findStart(journalDir),
                { file: "Journal.200101000000.01.log", offset: 0, line: 1 });
        });
        it("returns empty start position when no journal file found", async () => {
            assertEquals(await Journal.findStart("src/test"), { file: "", offset: 0, line: 1 });
        });
    });

    describe("findLastEvent", () => {
        it("returns end position of journal if event was not found", async () => {
            assertEquals(await Journal.findLastEvent(journalDir, "SquadronCreated"),
                { file: "Journal.2023-01-01T000000.01.log", offset: 222, line: 3 });
        });
        it("returns start position when no journal file found", async () => {
            assertEquals(await Journal.findLastEvent("src/test", "Commander"), { file: "", offset: 0, line: 1 });
        });
        it("returns last position of journal event if fond", async () => {
            assertEquals(await Journal.findLastEvent(journalDir, "Commander"),
                { file: "Journal.2022-01-01T000000.01.log", offset: 163, line: 2 });
            assertEquals(await Journal.findLastEvent(journalDir, "Fileheader"),
                { file: "Journal.2023-01-01T000000.01.log", offset: 0, line: 1 });
        });
        it("throws error when encountering broken journal file", async () => {
            await assertThrowWithMessage(() => Journal.findLastEvent("src/test/data/broken", "Commander"), JournalError,
                "Parse error in Journal.2023-01-01T000000.01.log:2: Expected double-quoted property name in JSON at position 38 (line 1 column 39): "
                + "{ \"timestamp\":\"2023-01-01T00:00:01Z\", ]");
        });
    });

    describe("next", () => {
        it("returns the next event in the journal", async () => {
            const journal = await Journal.open({
                directory: journalDir,
                position: { file: "Journal.2022-01-01T000000.01.log", offset: 163, line: 2 }
            });
            try {
                assertEquals(await journal.next(), { timestamp: "2022-01-01T00:00:01Z", event: "Commander", FID: "F1234", Name: "Jameson" });
                assertEquals(await journal.next(), { timestamp: "2022-01-01T00:00:02Z", event: "Shutdown" });
                assertEquals(await journal.next(), {
                    timestamp: "2023-01-01T00:00:00Z",
                    event: "Fileheader",
                    part: 1,
                    language: "English\\UK",
                    Odyssey: true,
                    gameversion: "4.0.0.600",
                    build: "r271793/r0 "
                });
                assertEquals(await journal.next(), { timestamp: "2023-01-01T00:00:01Z", event: "Shutdown" });
                assertNull(await journal.next());
                assertNull(await journal.next());
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
                    assertEquals(await journal.next(), { timestamp: "2023-01-01T00:00:01Z", event: "Shutdown" });
                    const promise = journal.next();
                    await writer.append("Journal.2023-01-01T000000.02.log",
                        `{ "timestamp":"2023-01-01T00:00:03Z", "event":"Died" }`);
                    assertEquals(await promise, { timestamp: "2023-01-01T00:00:03Z", event: "Died" });
                } finally {
                    await journal.close();
                }
            } finally {
                await writer.done();
            }
        });
    });

    describe("close", () => {
        it("Aborts watching for journals", async () => {
            const journal = await Journal.open({ directory: journalDir, position: "start", watch: true });
            for await (const event of journal) {
                if (event.timestamp === "2022-01-01T00:00:00Z") {
                    await journal.close();
                }
            }
            assertEquals(journal.getPosition(), {
                file: "Journal.2022-01-01T000000.01.log",
                line: 2,
                offset: 163
            });
        });
        it("Does not yield any data if closed right after open", async () => {
            const journal = await Journal.open({ directory: journalDir, position: "start", watch: true });
            await journal.close();
            const events = [];
            for await (const event of journal) {
                events.push(event);
            }
            assertSame(events.length, 0);
        });
    });

    describe("getLastPosition", () => {
        it("returns the position of the last read event", async () => {
            const events = [];
            const journal = await Journal.open({ directory: journalDir, position: "start" });
            try {
                let lastPosition = journal.getPosition();
                for await (const event of journal) {
                    assertEquals(journal.getLastPosition(), lastPosition);
                    lastPosition = journal.getPosition();
                    events.push(event);
                }
                assertSame(events.length, 9);
            } finally {
                await journal.close();
            }
        });
    });

    const fileTypes = [
        "Backpack", "Cargo", "FCMaterials", "Market", "ModulesInfo", "NavRoute", "Outfitting", "ShipLocker",
        "Shipyard", "Status"
    ] as const;
    const json = {
        Backpack: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "Backpack"
        } as Backpack,
        Cargo: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "Cargo"
        } as Cargo,
        FCMaterials: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "FCMaterials",
            MarketID: 0,
            CarrierName: "Asuna",
            CarrierID: "XZJ-4XZ",
            Items: []
        } as ExtendedFCMaterials,
        Market: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "Market",
            MarketID: 0,
            StarSystem: "Star",
            StationName: "Station",
            Items: []
        } as ExtendedMarket,
        ModulesInfo: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "ModuleInfo",
            Modules: []
        } as ExtendedModuleInfo,
        NavRoute: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "NavRoute",
            Route: []
        } as ExtendedNavRoute,
        Outfitting: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "Outfitting",
            MarketID: 128858698,
            StationName: "Kay Manor",
            StarSystem: "Paradise",
            Horizons: true,
            Items: []
        } as ExtendedOutfitting,
        ShipLocker: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "ShipLocker"
        } as ShipLocker,
        Shipyard: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "Shipyard",
            MarketID: 128858698,
            StationName: "Kay Manor",
            StarSystem: "Paradise",
            Horizons: true,
            AllowCobraMkIV: true,
            PriceList: []
        } as ExtendedShipyard,
       Status: {
            timestamp: "2023-01-01T00:00:01Z",
            event: "Status",
            Flags: Flag.ANALYSIS_MODE | Flag.DOCKED,
            Flags2: Flag2.COLD | Flag2.IN_TAXI,
            GuiFocus: GuiFocus.FSS_MODE,
            LegalState: "IllegalCargo"
        } as Status
    };
    const readMethods: Record<string, () => Promise<JournalEvent | null>> = {
        Backpack: Journal.prototype.readBackpack,
        Cargo: Journal.prototype.readCargo,
        FCMaterials: Journal.prototype.readFCMaterials,
        Market: Journal.prototype.readMarket,
        ModulesInfo: Journal.prototype.readModulesInfo,
        NavRoute: Journal.prototype.readNavRoute,
        Outfitting: Journal.prototype.readOutfitting,
        ShipLocker: Journal.prototype.readShipLocker,
        Shipyard: Journal.prototype.readShipyard,
        Status: Journal.prototype.readStatus
    };
    const watchMethods: Record<string, () => AsyncGenerator<JournalEvent>> = {
        Backpack: Journal.prototype.watchBackpack,
        Cargo: Journal.prototype.watchCargo,
        FCMaterials: Journal.prototype.watchFCMaterials,
        Market: Journal.prototype.watchMarket,
        ModulesInfo: Journal.prototype.watchModulesInfo,
        NavRoute: Journal.prototype.watchNavRoute,
        Outfitting: Journal.prototype.watchOutfitting,
        ShipLocker: Journal.prototype.watchShipLocker,
        Shipyard: Journal.prototype.watchShipyard,
        Status: Journal.prototype.watchStatus
    };

    for (const fileType of fileTypes) {
        describe(`read${fileType}`, () => {
            it("returns null when file does not exist", async () => {
                const writer = await JournalWriter.create(journalDir);
                try {
                    const journal = await Journal.open({ directory: writer.directory });
                    try {
                        assertNull(await readMethods[fileType].call(journal));
                    } finally {
                        await journal.close();
                    }
                } finally {
                    await writer.done();
                }
            });
            it("returns the current data", async () => {
                const writer = await JournalWriter.create(journalDir);
                try {
                    const data = json[fileType];
                    await writer.write(`${fileType}.json`, JSON.stringify(data));
                    const journal = await Journal.open({ directory: writer.directory });
                    try {
                        assertEquals(await readMethods[fileType].call(journal), data);
                    } finally {
                        await journal.close();
                    }
                } finally {
                    await writer.done();
                }
            });
            it("waits for a complete JSON", async () => {
                const writer = await JournalWriter.create(journalDir);
                try {
                    const data = json[fileType];
                    await writer.write(`${fileType}.json`, JSON.stringify(data).substring(0, 15));
                    const journal = await Journal.open({ directory: writer.directory });
                    try {
                        const promise = readMethods[fileType].call(journal);
                        await sleep(50);
                        await writer.write(`${fileType}.json`, JSON.stringify(data));
                        assertEquals(await promise, data);
                    } finally {
                        await journal.close();
                    }
                } finally {
                    await writer.done();
                }
            });
        });

        describe(`watch${fileType}`, () => {
            it("watches the file", async () => {
                const writer = await JournalWriter.create(journalDir);
                try {
                    const updateData = async (index: number): Promise<void> => {
                        const data = { ...json[fileType], timestamp: `${index}` };
                        await writer.write(`${fileType}.json`, JSON.stringify(data));
                    };
                    const journal = await Journal.open({ directory: writer.directory });
                    let index = 0;
                    setTimeout(() => updateData(++index), 25);
                    let lastSeen = -1;
                    try {
                        for await (const status of watchMethods[fileType].call(journal)) {
                            const currentIndex = Number(status.timestamp);
                            if (currentIndex > lastSeen) {
                                lastSeen = currentIndex;
                                assertSame(currentIndex, index);
                                if (index < 3) {
                                    setTimeout(() => updateData(++index), 100);
                                } else {
                                    break;
                                }
                            }
                        }
                    } finally {
                        await journal.close();
                    }
                } finally {
                    await writer.done();
                }
            });
            it("can be terminated right away", async () => {
                const journal = await Journal.open({ directory: journalDir, watch: true });
                await journal.close();
                const events = [];
                for await (const status of watchMethods[fileType].call(journal)) {
                    events.push(status);
                }
                assertSame(events.length, 0);
            });
            it("can be terminated after first report", async () => {
                const writer = await JournalWriter.create(journalDir);
                try {
                    const initial = json[fileType];
                    await writer.write(`${fileType}.json`, JSON.stringify(initial));
                    const journal = await Journal.open({ directory: writer.directory, watch: true });
                    const events = [];
                    void (async () => {
                        await sleep(0);
                        await journal.close();
                    })();
                    for await (const status of watchMethods[fileType].call(journal)) {
                        events.push(status);
                    }
                    assertSame(events.length, 1);
                } finally {
                    await writer.done();
                }
            });
            it("reports the initial data", async () => {
                const writer = await JournalWriter.create(journalDir);
                try {
                    const initial = json[fileType];
                    await writer.write(`${fileType}.json`, JSON.stringify(initial));
                    const journal = await Journal.open({ directory: writer.directory });
                    try {
                        for await (const status of watchMethods[fileType].call(journal)) {
                            assertEquals(status, initial);
                            break;
                        }
                    } finally {
                        await journal.close();
                    }
                } finally {
                    await writer.done();
                }
            });
        });
    }
});
