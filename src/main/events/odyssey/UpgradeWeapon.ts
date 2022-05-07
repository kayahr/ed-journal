/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface UpgradeWeapon extends JournalEvent<"UpgradeWeapon"> {
    Name: string;
    Name_Localised: string;
    Class: number;
    SuitModuleID: number;
    Cost: number;
}
