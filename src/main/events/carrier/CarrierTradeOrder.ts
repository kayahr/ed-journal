/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface CarrierTradeOrder extends JournalEvent<"CarrierTradeOrder"> {
    CarrierID: ID;
    BlackMarket: boolean;
    Commodity: string;
    Commodity_Localised?: string;
    CancelTrade?: boolean;
    PurchaseOrder?: number;
    SaleOrder?: number;
    Price?: number;
}
