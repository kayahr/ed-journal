/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";

export interface EngineerCraft extends JournalEvent<"EngineerCraft"> {
    timestamp: string;
    ApplyExperimentalEffect?: string;
    Blueprint?: string;
    BlueprintID?: number;
    BlueprintName?: string;
    Engineer: string;
    EngineerID?: number;
    ExperimentalEffect?: string;
    ExperimentalEffect_Localised?: string;
    Ingredients: Array<{
        Count: number;
        Name: string;
        Name_Localised?: string;
    }>;
    Level: number;
    Modifiers?: Array<{
        Label: string;
        LessIsGood?: number;
        OriginalValue?: number;
        Value?: number;
        ValueStr?: string;
        ValueStr_Localised?: string;
    }>;
    Module?: string;
    Quality?: number;
    Slot?: string;
}

interface DeprecatedEngineerCraft extends JournalEvent<"EngineerCraft"> {
    Ingredients?: { [ name: string ]: number };
}

registerJournalEventUpdate("EngineerCraft", (json: DeprecatedEngineerCraft | EngineerCraft)  => {
    // Since ED 2.3 the Ingredients data has changed from an object to an array of objects.
    if (json.Ingredients != null && !(json.Ingredients instanceof Array)) {
        json.Ingredients = Object.entries(json.Ingredients).map(
            ([ Name, Count ]) => ({ Name, Count }));
    }
});
