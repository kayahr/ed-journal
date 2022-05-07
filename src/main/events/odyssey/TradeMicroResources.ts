/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface TradeMicroResources extends JournalEvent<"TradeMicroResources"> {
    Offered: Array<{
        Name: string;
        Name_Localised?: string;
        Category: string;
        Count: number;
    }>;
    TotalCount: number;
    Received: string;
    Received_Localised?: string;
    Count: number;
    Category: string;
    MarketID: number;
}
