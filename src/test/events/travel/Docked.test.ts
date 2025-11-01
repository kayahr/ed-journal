import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertEquals, assertNotHasProperty, assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/Docked";

describe("Docked", () => {
    it("updates old properties to new properties", async () => {
        const journal = await Journal.open({ directory, position: "start" });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Docked");
            if (event?.event === "Docked") {
                assertEquals(event.StationFaction, { Name: "Wu Guinagi Crimson Creative Corp",
                    FactionState: "Boom" });
                assertSame(event.StationGovernment, "$government_Corporate;");
                assertSame(event.StationGovernment_Localised, "Corporate");
                assertSame(event.StationEconomy, "$economy_Industrial;");
                assertSame(event.StationEconomy_Localised, "Industrial");
                assertSame(event.StationAllegiance, "Empire");
                assertNotHasProperty(event, "Faction");
                assertNotHasProperty(event, "Faction_Localised");
                assertNotHasProperty(event, "Government");
                assertNotHasProperty(event, "Government_Localised");
                assertNotHasProperty(event, "Economy");
                assertNotHasProperty(event, "Economy_Localised");
                assertNotHasProperty(event, "Allegiance");
                assertNotHasProperty(event, "FactionState");
            }
        } finally {
            await journal.close();
        }
    });
    it("updates StationFaction string to object", async () => {
        const journal = await Journal.open({
            directory,
            position: { file: "Journal.190119140425.01.log", offset: 0, line: 1 }
        });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Docked");
            if (event?.event === "Docked") {
                assertEquals(event.StationFaction, { Name: "Omega Mining Corporation", FactionState: "Investment" });
                assertNotHasProperty(event, "FactionState");
            }
        } finally {
            await journal.close();
        }
    });
    it("updates station services from old names to new names", async () => {
        const journal = await Journal.open({
            directory,
            position: { file: "Journal.190119140425.01.log", offset: 0, line: 1 }
        });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Docked");
            if (event?.event === "Docked") {
                assertEquals(event.StationServices, [
                    "dock",
                    "autodock",
                    "blackmarket",
                    "commodities",
                    "contacts",
                    "exploration",
                    "missions",
                    "outfitting",
                    "crewlounge",
                    "rearm",
                    "refuel",
                    "repair",
                    "shipyard",
                    "tuning",
                    "engineer",
                    "missionsgenerated",
                    "flightcontroller",
                    "stationoperations",
                    "powerplay",
                    "searchrescue",
                    "stationMenu",
                    "techBroker"
                ]);
            }
        } finally {
            await journal.close();
        }
    });
});
