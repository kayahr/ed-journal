import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertEquals, assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/Scan";

describe("Scan", () => {
    it("updates Materials object to array", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Scan");
            if (event?.event === "Scan" && event.PlanetClass != null) {
                assertEquals(event.Materials, [
                    { Name: "iron", Percent: 23 },
                    { Name: "nickel", Percent: 17.4 },
                    { Name: "sulphur", Percent: 16 },
                    { Name: "carbon", Percent: 13.5 },
                    { Name: "chromium", Percent: 10.3 },
                    { Name: "phosphorus", Percent: 8.6 },
                    { Name: "vanadium", Percent: 5.6 },
                    { Name: "arsenic", Percent: 2.1 },
                    { Name: "cadmium", Percent: 1.8 },
                    { Name: "mercury", Percent: 1 },
                    { Name: "polonium", Percent: 0.6 }
                ]);
            }
        } finally {
            await journal.close();
        }
    });
});
