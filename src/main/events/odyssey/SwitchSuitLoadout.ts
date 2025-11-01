/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface SwitchSuitLoadout extends JournalEvent<"SwitchSuitLoadout"> {
    SuitID: ID;
    SuitName: string;
    SuitName_Localised: string;
    SuitMods?: string[];
    LoadoutID: ID;
    LoadoutName: string;
    Modules: Array<{
        SlotName: string;
        SuitModuleID: ID;
        ModuleName: string;
        ModuleName_Localised: string;
        Class?: number;
        WeaponMods?: string[];
    }>;
}
