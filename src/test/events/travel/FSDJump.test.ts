import { join } from "path";

import { Journal } from "../../../main/Journal";

const directory = join(__dirname, "../../../../src/test/data/events/FSDJump");

describe("FSDJump", () => {
    it("updates old properties to new properties", async () => {
        const journal = await Journal.create({ directory });
        const event = await journal.next();
        expect(event?.event).toBe("FSDJump");
        if (event?.event === "FSDJump") {
            expect(event.SystemFaction).toEqual({ Name: "Wu Guinagi Crimson Creative Corp", FactionState: "Boom" });
            expect(event.SystemGovernment).toBe("$government_Corporate;");
            expect(event.SystemGovernment_Localised).toBe("Corporate");
            expect(event.SystemEconomy).toBe("$economy_Industrial;");
            expect(event.SystemEconomy_Localised).toBe("Industrial");
            expect(event.SystemSecurity).toBe("$SYSTEM_SECURITY_medium;");
            expect(event.SystemSecurity_Localised).toBe("Medium Security");
            expect(event.SystemAllegiance).toBe("Empire");
            expect(event).not.toHaveProperty("Faction");
            expect(event).not.toHaveProperty("Faction_Localised");
            expect(event).not.toHaveProperty("Government");
            expect(event).not.toHaveProperty("Government_Localised");
            expect(event).not.toHaveProperty("Economy");
            expect(event).not.toHaveProperty("Economy_Localised");
            expect(event).not.toHaveProperty("Security");
            expect(event).not.toHaveProperty("Security_Localised");
            expect(event).not.toHaveProperty("Allegiance");
            expect(event).not.toHaveProperty("FactionState");
        }
    });
    it("updates SystemFaction string to object", async () => {
        const journal = await Journal.create({
            directory,
            position: { file: "Journal.190119140425.01.log", offset: 0, line: 1 }
        });
        const event = await journal.next();
        expect(event?.event).toBe("FSDJump");
        if (event?.event === "FSDJump") {
            expect(event.SystemFaction).toEqual({ Name: "Omega Mining Corporation", FactionState: "Investment" });
            expect(event).not.toHaveProperty("FactionState");
        }
    });
});
