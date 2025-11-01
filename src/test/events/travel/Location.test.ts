import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertEquals, assertNotHasProperty, assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/Location";

describe("Location", () => {
    it("updates old properties to new properties", async () => {
        const journal = await Journal.open({ directory, position: "start" });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Location");
            if (event?.event === "Location") {
                assertEquals(event.SystemFaction, { Name: "Wu Guinagi Crimson Creative Corp", FactionState: "Boom" });
                assertSame(event.SystemGovernment, "$government_Corporate;");
                assertSame(event.SystemGovernment_Localised, "Corporate");
                assertSame(event.SystemEconomy, "$economy_Industrial;");
                assertSame(event.SystemEconomy_Localised, "Industrial");
                assertSame(event.SystemSecurity, "$SYSTEM_SECURITY_medium;");
                assertSame(event.SystemSecurity_Localised, "Medium Security");
                assertSame(event.SystemAllegiance, "Empire");
                assertNotHasProperty(event, "Faction");
                assertNotHasProperty(event, "Faction_Localised");
                assertNotHasProperty(event, "Government");
                assertNotHasProperty(event, "Government_Localised");
                assertNotHasProperty(event, "Economy");
                assertNotHasProperty(event, "Economy_Localised");
                assertNotHasProperty(event, "Security");
                assertNotHasProperty(event, "Security_Localised");
                assertNotHasProperty(event, "Allegiance");
                assertNotHasProperty(event, "FactionState");
            }
        } finally {
            await journal.close();
        }
    });
    it("updates SystemFaction/StationFaction string to object", async () => {
        const journal = await Journal.open({
            directory,
            position: { file: "Journal.190119140425.01.log", offset: 0, line: 1 }
        });
        try {
            const event = await journal.next();
            assertSame(event?.event, "Location");
            if (event?.event === "Location") {
                assertEquals(event.SystemFaction, { Name: "Omega Mining Corporation", FactionState: "Investment" });
                assertEquals(event.StationFaction, { Name: "Omega Mining Corporation" });
                assertNotHasProperty(event, "FactionState");
            }
        } finally {
            await journal.close();
        }
    });
    it("removes empty station type property", async () => {
        await using journal = await Journal.open({ directory, position: { file: "Journal.190119140426.01.log", offset: 0, line: 1 }
        });
        const event = await journal.next();
        assertSame(event?.event, "Location");
        if (event?.event === "Location") {
            assertSame(event.StationType, undefined);
        }
    });
});
