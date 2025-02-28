import { describe, expect, it } from "vitest";

import { correctStationService } from "../../../main/events/types/StationService.js";

describe("StationService", () => {
    describe("correctStationService", () => {
        it("corrects old station service names to new ones", () => {
            expect(correctStationService("BlackMarket")).toBe("blackmarket");
            expect(correctStationService("Workshop")).toBe("engineer");
            expect(correctStationService("SearchAndRescue")).toBe("searchrescue");
            expect(correctStationService("TechBroker")).toBe("techBroker");
            expect(correctStationService("StationMenu")).toBe("stationMenu");
        });
        it("does not change service names starting with lower-case character", () => {
            expect(correctStationService("whatEver")).toBe("whatEver");
        });
    });
});
