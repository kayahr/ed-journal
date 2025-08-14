/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface CarrierShipPackBase extends JournalEvent<"CarrierShipPack"> {
    CarrierID: ID;
    PackTheme: string;
    PackTier: number;
}

export interface CarrierShipPackBuy extends CarrierShipPackBase {
    Operation: "BuyPack";
    Cost: number;
}

export interface CarrierShipPackSell extends CarrierShipPackBase {
    Operation: "SellPack";
    Refund: number;
}

export type CarrierShipPack = CarrierShipPackBuy | CarrierShipPackSell;
