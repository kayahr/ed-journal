import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/Backpack";

describe("Scan", () => {
    it("rename BackPack and BackPackMaterials event to Backpack", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event1 = await journal.next();
            assertSame(event1?.event, "Backpack");
            const event2 = await journal.next();
            assertSame(event2?.event, "Backpack");
        } finally {
            await journal.close();
        }
    });
});
