/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface ScientificResearch extends JournalEvent<"ScientificResearch"> {
    Category: string;
    Count: number;
    MarketID?: number;
    Name: string;
    Name_Localised?: string;
}
