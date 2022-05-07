/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface EngineerLegacyConvert extends JournalEvent<"EngineerLegacyConvert"> {
    ApplyExperimentalEffect?: string;
    Blueprint?: string;
    BlueprintID?: number;
    BlueprintName?: string;
    Engineer: string;
    EngineerID?: number;
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
