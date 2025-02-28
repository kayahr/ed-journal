/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface MarketBuy extends JournalEvent<"MarketBuy"> {
    BuyPrice: number;
    Count: number;
    MarketID?: number;
    TotalCost: number;
    Type: string;
    Type_Localised?: string;
}
