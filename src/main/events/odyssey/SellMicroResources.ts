/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface SellMicroResources extends JournalEvent<"SellMicroResources"> {
    TotalCount: number;
    MicroResources: Array<{
        Name: string;
        Name_Localised?: string;
        Category: string;
        Count: number;
    }>;
    Price: number;
    MarketID: number;
}
