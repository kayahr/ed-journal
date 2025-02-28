/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface UpgradeSuit extends JournalEvent<"UpgradeSuit"> {
    Name: string;
    Name_Localised: string;
    SuitID: number;
    Class: number;
    Cost: number;
}
