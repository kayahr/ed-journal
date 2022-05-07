import * as path from "path";

import { Journal } from "../../../main/Journal";

const directory = path.join(__dirname, "../../../../src/test/data/events/EngineerCraft");

describe("EngineerCraft", () => {
    it("updates Ingredients object to array", async () => {
        const journal = new Journal({ directory });
        const event = await journal.next();
        expect(event?.event).toBe("EngineerCraft");
        if (event?.event === "EngineerCraft") {
            expect(event.Ingredients).toEqual([
                { Name: "emissiondata", Count: 1 },
                { Name: "cadmium", Count: 2 },
                { Name: "protoheatradiators", Count: 3 }
            ]);
        }
    });
});
