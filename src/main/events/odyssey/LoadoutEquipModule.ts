/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface LoadoutEquipModule extends JournalEvent<"LoadoutEquipModule"> {
    LoadoutName: string;
    SuitID: ID;
    SuitName: string;
    SuitName_Localised: string;
    LoadoutID: ID;
    SlotName: string;
    ModuleName: string;
    ModuleName_Localised: string;
    Class?: number;
    WeaponMods?: string[];
    SuitModuleID: ID;
}
