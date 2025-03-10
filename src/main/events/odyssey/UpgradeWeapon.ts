/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface UpgradeWeapon extends JournalEvent<"UpgradeWeapon"> {
    Name: string;
    Name_Localised: string;
    Class: number;
    SuitModuleID: number;
    Cost: number;
    Resources?: Array<{
        Name: string;
        Name_Localised?: string;
        Count: number;
    }>;
}
