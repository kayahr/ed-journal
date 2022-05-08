import { join } from "path";

import { Journal } from "../../../main/Journal";

const directory = join(__dirname, "../../../../src/test/data/events/Docked");

describe("Docked", () => {
    it("updates old properties to new properties", async () => {
        const journal = await Journal.open({ directory });
        try {
            const event = await journal.next();
            expect(event?.event).toBe("Docked");
            if (event?.event === "Docked") {
                expect(event.StationFaction).toEqual({ Name: "Wu Guinagi Crimson Creative Corp",
                    FactionState: "Boom" });
                expect(event.StationGovernment).toBe("$government_Corporate;");
                expect(event.StationGovernment_Localised).toBe("Corporate");
                expect(event.StationEconomy).toBe("$economy_Industrial;");
                expect(event.StationEconomy_Localised).toBe("Industrial");
                expect(event.StationAllegiance).toBe("Empire");
                expect(event).not.toHaveProperty("Faction");
                expect(event).not.toHaveProperty("Faction_Localised");
                expect(event).not.toHaveProperty("Government");
                expect(event).not.toHaveProperty("Government_Localised");
                expect(event).not.toHaveProperty("Economy");
                expect(event).not.toHaveProperty("Economy_Localised");
                expect(event).not.toHaveProperty("Allegiance");
                expect(event).not.toHaveProperty("FactionState");
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
            expect(event?.event).toBe("Docked");
            if (event?.event === "Docked") {
                expect(event.StationFaction).toEqual({ Name: "Omega Mining Corporation", FactionState: "Investment" });
                expect(event).not.toHaveProperty("FactionState");
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
            expect(event?.event).toBe("Docked");
            if (event?.event === "Docked") {
                expect(event.StationServices).toEqual([
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
