/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ModuleBuy extends JournalEvent<"ModuleBuy"> {
    BuyItem: string;
    BuyItem_Localised?: string;
    BuyPrice: number;
    MarketID?: number;
    SellItem?: string;
    SellItem_Localised?: string;
    SellPrice?: number;
    Ship: string;
    ShipID: number;
    Slot: string;
    StoredItem?: string;
    StoredItem_Localised?: string;
}
