/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CreateSuitLoadout extends JournalEvent<"CreateSuitLoadout"> {
    SuitID: number;
    SuitName: string;
    SuitName_Localised: string;
    SuitMods?: string[];
    LoadoutID: number;
    LoadoutName: string;
    Modules: Array<{
        SlotName: string;
        SuitModuleID: number;
        ModuleName: string;
        ModuleName_Localised: string;
        Class?: number;
        WeaponMods?: string[];
    }>
}
