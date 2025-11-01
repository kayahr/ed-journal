/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ModuleBuy extends JournalEvent<"ModuleBuy"> {
    BuyItem: string;
    BuyItem_Localised?: string;
    BuyPrice: number;
    MarketID?: ID;
    SellItem?: string;
    SellItem_Localised?: string;
    SellPrice?: number;
    Ship: string;
    ShipID: ID;
    Slot: string;
    StoredItem?: string;
    StoredItem_Localised?: string;
}
