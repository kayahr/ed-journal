import { describe, it } from "node:test";
import { assertSame } from "@kayahr/assert";
import { Journal } from "../../../main/Journal.ts";

const directory = "src/test/data/events/CarrierNameChange";

describe("CarrierNameChange", () => {
    it("updates broken property name", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            assertSame(event?.event, "CarrierNameChange");
            if (event?.event === "CarrierNameChange") {
                assertSame(event.CarrierType, "FleetCarrier");
            }
        } finally {
            await journal.close();
        }
    });
});
