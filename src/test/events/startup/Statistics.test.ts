import { join } from "path";

import { Journal } from "../../../main/Journal";

const directory = join(__dirname, "../../../../src/test/data/events/Statistics");

describe("Statistics", () => {
    it("updates fleet carrier distance travelled from LY string to number", async () => {
        const journal = await Journal.create({ directory });
        try {
            const event = await journal.next();
            expect(event?.event).toBe("Statistics");
            if (event?.event === "Statistics") {
                expect(event.FLEETCARRIER?.FLEETCARRIER_DISTANCE_TRAVELLED).toBe(74268);
            }
        } finally {
            await journal.close();
        }
    });
});
