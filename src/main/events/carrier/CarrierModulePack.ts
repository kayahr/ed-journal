/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { CarrierType } from "../types/CarrierType.js";
import type { ID } from "../types/ID.js";

export interface CarrierModulePackBase extends JournalEvent<"CarrierModulePack"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    PackTheme: string;
    PackTier: number;
}

export interface CarrierModulePackBuy extends CarrierModulePackBase {
    Operation: "BuyPack";
    Cost: number;
}

export interface CarrierModulePackSell extends CarrierModulePackBase {
    Operation: "SellPack";
    Refund: number;
}

export type CarrierModulePack = CarrierModulePackBuy | CarrierModulePackSell;
