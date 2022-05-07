import * as path from "path";

import { Journal } from "../../../main/Journal";

const directory = path.join(__dirname, "../../../../src/test/data/events/Scan");

describe("Scan", () => {
    it("updates Materials object to array", async () => {
        const journal = new Journal({ directory });
        const event = await journal.next();
        expect(event?.event).toBe("Scan");
        if (event?.event === "Scan") {
            expect(event.Materials).toEqual([
                { Name: "iron", Percent: 23.0 },
                { Name: "nickel", Percent: 17.4 },
                { Name: "sulphur", Percent: 16.0 },
                { Name: "carbon", Percent: 13.5 },
                { Name: "chromium", Percent: 10.3 },
                { Name: "phosphorus", Percent: 8.6 },
                { Name: "vanadium", Percent: 5.6 },
                { Name: "arsenic", Percent: 2.1 },
                { Name: "cadmium", Percent: 1.8 },
                { Name: "mercury", Percent: 1.0 },
                { Name: "polonium", Percent: 0.6 }
            ]);
        }
    });
});
