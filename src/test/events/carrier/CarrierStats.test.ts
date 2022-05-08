import { join } from "path";

import { Journal } from "../../../main/Journal";

const directory = join(__dirname, "../../../../src/test/data/events/CarrierStats");

describe("CarrierStats", () => {
    it("updates old TaxRate to new TaxRate_rearm, TaxRate_refuel and TaxRate_repair", async () => {
        const journal = await Journal.create({ directory });
        try {
            const event = await journal.next();
            expect(event?.event).toBe("CarrierStats");
            if (event?.event === "CarrierStats") {
                expect(event.Finance.TaxRate_rearm).toBe(25);
                expect(event.Finance.TaxRate_refuel).toBe(25);
                expect(event.Finance.TaxRate_repair).toBe(25);
            }
        } finally {
            await journal.close();
        }
    });
});
