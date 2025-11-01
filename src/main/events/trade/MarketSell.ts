/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface MarketSell extends JournalEvent<"MarketSell"> {
    AvgPricePaid: number;
    BlackMarket?: boolean;
    Count: number;
    IllegalGoods?: boolean;
    MarketID?: ID;
    SellPrice: number;
    StolenGoods?: boolean;
    TotalSale: number;
    Type: string;
    Type_Localised?: string;
}
