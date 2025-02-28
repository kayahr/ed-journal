/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/** Verify by buying a new ship and selling the current one the same time. */
export interface ShipyardBuy extends JournalEvent<"ShipyardBuy"> {
    MarketID?: number;
    ShipPrice: number;
    ShipType: string;
    ShipType_Localised?: string;
    StoreOldShip?: string;
    StoreShipID?: number;
    SellOldShip?: string;
    SellShipID?: number;
    SellPrice?: number;
}
