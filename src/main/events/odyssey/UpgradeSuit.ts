/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface UpgradeSuit extends JournalEvent<"UpgradeSuit"> {
    Name: string;
    Name_Localised: string;
    SuitID: ID;
    Class: number;
    Cost: number;
    Resources?: Array<{
        Name: string;
        Name_Localised?: string;
        Count: number;
    }>;
}
