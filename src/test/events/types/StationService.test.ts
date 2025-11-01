import { describe, it } from "node:test";

import { correctStationService } from "../../../main/events/types/StationService.ts";
import { assertSame } from "@kayahr/assert";

describe("StationService", () => {
    describe("correctStationService", () => {
        it("corrects old station service names to new ones", () => {
            assertSame(correctStationService("BlackMarket"), "blackmarket");
            assertSame(correctStationService("Workshop"), "engineer");
            assertSame(correctStationService("SearchAndRescue"), "searchrescue");
            assertSame(correctStationService("TechBroker"), "techBroker");
            assertSame(correctStationService("StationMenu"), "stationMenu");
        });
        it("does not change service names starting with lower-case character", () => {
            assertSame(correctStationService("whatEver"), "whatEver");
        });
    });
});
