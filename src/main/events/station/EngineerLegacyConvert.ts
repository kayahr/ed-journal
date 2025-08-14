/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface EngineerLegacyConvert extends JournalEvent<"EngineerLegacyConvert"> {
    ApplyExperimentalEffect?: string;
    Blueprint?: string;
    BlueprintID?: ID;
    BlueprintName?: string;
    Engineer: string;
    EngineerID?: ID;
    ExperimentalEffect?: string;
    ExperimentalEffect_Localised?: string;
    IsPreview: boolean;
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
