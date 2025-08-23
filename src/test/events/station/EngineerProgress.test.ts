import { describe, expect, it } from "vitest";

import type { Engineer } from "../../../main/events/station/EngineerProgress.js";
import { Journal } from "../../../main/Journal.js";

const directory = "src/test/data/events/EngineerProgress";

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
    }
];

describe("EngineerProgress", () => {
    it("updates engineer object to array", async () => {
        const journal = await Journal.open({ directory });
        try {
            for (const engineer of engineers) {
                const event = await journal.next();
                expect(event?.event).toBe("EngineerProgress");
                if (event?.event === "EngineerProgress") {
                    expect(event.Engineers).toEqual([ engineer ]);
                }
            }
        } finally {
            await journal.close();
        }
    });
});
