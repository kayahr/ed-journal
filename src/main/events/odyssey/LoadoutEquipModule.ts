/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface LoadoutEquipModule extends JournalEvent<"LoadoutEquipModule"> {
    LoadoutName: string;
    SuitID: number;
    SuitName: string;
    SuitName_Localised: string;
    LoadoutID: number;
    SlotName: string;
    ModuleName: string;
    ModuleName_Localised: string;
    Class?: number;
    WeaponMods?: string[];
    SuitModuleID: number;
}
