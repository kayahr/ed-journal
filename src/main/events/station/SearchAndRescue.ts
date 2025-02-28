/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface SearchAndRescue extends JournalEvent<"SearchAndRescue"> {
    Count: number;
    MarketID?: number;
    Name: string;
    Name_Localised?: string;
    Reward: number;
}
