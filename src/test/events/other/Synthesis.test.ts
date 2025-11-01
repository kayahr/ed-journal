import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertEquals, assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/Synthesis";

describe("Synthesis", () => {
    it("updates Materials object to array", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Synthesis");
            if (event?.event === "Synthesis") {
                assertEquals(event.Materials, [
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
