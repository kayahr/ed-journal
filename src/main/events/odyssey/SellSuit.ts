/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface SellSuit extends JournalEvent<"SellSuit"> {
    Name: string;
    Name_Localised: string;
    Price: number;
    SuitID: number;
    SuitMods?: string[];
}
