import { describe, expect, it } from "vitest";

import { Journal } from "../../../main/Journal.js";

const directory = "src/test/data/events/Synthesis";

describe("Synthesis", () => {
    it("updates Materials object to array", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            expect(event?.event).toBe("Synthesis");
            if (event?.event === "Synthesis") {
                expect(event.Materials).toEqual([
                    { Name: "iron", Percent: 1 },
                    { Name: "zinc", Percent: 2 },
                    { Name: "phosphorus", Percent: 3 },
                    { Name: "selenium", Percent: 4 },
                    { Name: "zirconium", Percent: 5 }
                ]);
            }
        } finally {
            await journal.close();
        }
    });
});
