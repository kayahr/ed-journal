/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CarrierTradeOrder extends JournalEvent<"CarrierTradeOrder"> {
    CarrierID: number;
    BlackMarket: boolean;
    Commodity: string;
    Commodity_Localised?: string;
    CancelTrade?: boolean;
    PurchaseOrder?: number;
    SaleOrder?: number;
    Price?: number;
}
