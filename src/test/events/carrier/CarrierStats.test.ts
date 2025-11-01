import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/CarrierStats";

describe("CarrierStats", () => {
    it("updates old TaxRate to new TaxRate_rearm, TaxRate_refuel and TaxRate_repair", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            assertSame(event?.event, "CarrierStats");
            if (event?.event === "CarrierStats") {
                assertSame(event.Finance.TaxRate_rearm, 25);
                assertSame(event.Finance.TaxRate_refuel, 25);
                assertSame(event.Finance.TaxRate_repair, 25);
            }
        } finally {
            await journal.close();
        }
    });
});
