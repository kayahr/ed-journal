import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/Statistics";

describe("Statistics", () => {
    it("updates fleet carrier distance travelled from LY string to number", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Statistics");
            if (event?.event === "Statistics") {
                assertSame(event.FLEETCARRIER?.FLEETCARRIER_DISTANCE_TRAVELLED, 74268);
            }
        } finally {
            await journal.close();
        }
    });
});
