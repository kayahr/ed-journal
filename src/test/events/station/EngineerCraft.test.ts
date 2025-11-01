import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertEquals, assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/EngineerCraft";

describe("EngineerCraft", () => {
    it("updates Ingredients object to array", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            assertSame(event?.event, "EngineerCraft");
            if (event?.event === "EngineerCraft") {
                assertEquals(event.Ingredients, [
                    { Name: "emissiondata", Count: 1 },
                    { Name: "cadmium", Count: 2 },
                    { Name: "protoheatradiators", Count: 3 }
                ]);
            }
        } finally {
            await journal.close();
        }
    });
});
