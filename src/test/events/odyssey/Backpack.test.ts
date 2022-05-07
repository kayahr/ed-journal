import * as path from "path";

import { Journal } from "../../../main/Journal";

const directory = path.join(__dirname, "../../../../src/test/data/events/Backpack");

describe("Scan", () => {
    it("rename BackPack and BackPackMaterials event to Backpack", async () => {
        const journal = new Journal({ directory });
        const event1 = await journal.next();
        expect(event1?.event).toBe("Backpack");
        const event2 = await journal.next();
        expect(event2?.event).toBe("Backpack");
    });
});
