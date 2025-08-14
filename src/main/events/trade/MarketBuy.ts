/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface MarketBuy extends JournalEvent<"MarketBuy"> {
    BuyPrice: number;
    Count: number;
    MarketID?: ID;
    TotalCost: number;
    Type: string;
    Type_Localised?: string;
}
