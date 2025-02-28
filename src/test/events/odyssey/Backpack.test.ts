import { describe, expect, it } from "vitest";

import { Journal } from "../../../main/Journal.js";

const directory = "src/test/data/events/Backpack";

describe("Scan", () => {
    it("rename BackPack and BackPackMaterials event to Backpack", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event1 = await journal.next();
            expect(event1?.event).toBe("Backpack");
            const event2 = await journal.next();
            expect(event2?.event).toBe("Backpack");
        } finally {
            await journal.close();
        }
    });
});
