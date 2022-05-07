import type { AnyJournalEvent } from "../main/AnyJournalEvent";

describe("AnyJournalEvent", () => {
    it("is a union type of all event types and supports type narrowing by event name", () => {
        const events: AnyJournalEvent[] = [
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
});
