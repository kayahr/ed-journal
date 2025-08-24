import { describe, expect, it } from "vitest";

import type { Engineer } from "../../../main/events/station/EngineerProgress.js";
import { Journal } from "../../../main/Journal.js";

const engineers: Engineer[] = [
    {
        Engineer: "Bill Turner",
        Progress: "Known"
    },
    {
        Engineer: "Bill Turner",
        EngineerID: 1234,
        Progress: "Known"
    },
    {
        Engineer: "Bill Turner",
        Progress: "Invited"
    },
    {
        Engineer: "Bill Turner",
        EngineerID: 1234,
        Progress: "Unlocked",
        Rank: 5,
        RankProgress: 0
    },
    {
        Engineer: "Bill Turner",
        EngineerID: 1234,
        Progress: "Unlocked",
        Rank: 0,
        RankProgress: 0
    },
    {
        Engineer: "Bill Turner",
        EngineerID: 1234,
        Progress: "Known"
    }
];

describe("EngineerProgress", () => {
    it("updates engineer object to array", async () => {
        await using journal = await Journal.open({ directory: "src/test/data/events/EngineerProgress" });
        for (const engineer of engineers) {
            const event = await journal.next();
            expect(event?.event).toBe("EngineerProgress");
            if (event?.event === "EngineerProgress") {
                expect(event.Engineers).toEqual([ engineer ]);
            }
        }
    });
    it("removes broken engineer objects where crucial engineer name is missing", async () => {
        await using journal = await Journal.open({ directory: "src/test/data/events/EngineerProgress2" });
        const event = await journal.next();
        expect(event?.event).toBe("EngineerProgress");
        if (event?.event === "EngineerProgress") {
            expect(event.Engineers).toEqual(engineers);
        }
    });
});
