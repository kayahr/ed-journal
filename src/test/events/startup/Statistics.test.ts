import * as path from "path";

import { Journal } from "../../../main/Journal";

const directory = path.join(__dirname, "../../../../src/test/data/events/Statistics");

describe("Statistics", () => {
    it("updates fleet carrier distance travelled from LY string to number", async () => {
        const journal = new Journal({ directory });
        const event = await journal.next();
        expect(event?.event).toBe("Statistics");
        if (event?.event === "Statistics") {
            expect(event.FLEETCARRIER?.FLEETCARRIER_DISTANCE_TRAVELLED).toBe(74268);
        }
    });
});
