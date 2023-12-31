import * as edj from "../main/index";

const journalDir = "src/test/data/journal";

describe("ed-journal", () => {
    it("exports the Journal class", async () => {
        const journal = await edj.Journal.open({ directory: journalDir });
        expect(journal).toBeInstanceOf(edj.Journal);
    });
    it("exports shared types", () => {
        const conflictFaction: edj.ConflictFaction = { Name: "foo", Stake: "bar", WonDays: 2 };
        expect(conflictFaction).toBeDefined();
        const powerState: edj.PowerState = "Prepared";
        expect(powerState).toBeDefined();
        const stationService: edj.StationService = "engineer";
        expect(stationService).toBeDefined();
    });
    it("exports the AnyJournalEvent type", () => {
        const events: edj.AnyJournalEvent[] = [
            { "event": "Died", "timestamp": "2009-06-28T12:00:00Z", "KillerName": "Kayahr" },
            { "event": "Continued", "timestamp": "2009-06-28T12:00:00Z", "Part": 2 }
        ];
        if (events[0].event === "Died") {
            expect(events[0].KillerName).toBe("Kayahr");
        }
        if (events[1].event === "Continued") {
            expect(events[1].Part).toBe(2);
        }
    });
    it("exports the journal event types", () => {
        const event: edj.Died = { "event": "Died", timestamp: "2009-06-28T12:00:00Z", KillerName: "Kayahr" };
        expect(event.KillerName).toBe("Kayahr");
    });
    it("exports the JournalError class", () => {
        expect(() => { throw new edj.JournalError("WTF"); }).toThrow();
    });
    it("exports the JournalEvent interface", () => {
        const event: edj.JournalEvent = { "event": "Custom", timestamp: "2009-06-28T12:00:00Z" };
        expect(event.event).toBe("Custom");
    });
    it("exports the JournalPosition interface", () => {
        const position: edj.JournalPosition = { file: "foo.log", offset: 2, line: 3 };
        expect(position.file).toBe("foo.log");
    });
    it("does not export LineReader", () => {
        expect(edj).not.toHaveProperty("LineReader");
    });
    it("does not export Notifier", () => {
        expect(edj).not.toHaveProperty("Notifier");
    });
});
