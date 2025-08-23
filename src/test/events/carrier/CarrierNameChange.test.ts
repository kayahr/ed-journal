import { describe, expect, it } from "vitest";

import { Journal } from "../../../main/Journal.js";

const directory = "src/test/data/events/CarrierNameChange";

describe("CarrierNameChange", () => {
    it("updates broken property name", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            expect(event?.event).toBe("CarrierNameChange");
            if (event?.event === "CarrierNameChange") {
                expect(event.CarrierType).toBe("FleetCarrier");
            }
        } finally {
            await journal.close();
        }
    });
});
