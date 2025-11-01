/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/** Verify by buying a new ship and selling the current one the same time. */
export interface ShipyardBuy extends JournalEvent<"ShipyardBuy"> {
    MarketID?: ID;
    ShipPrice: number;
    ShipType: string;
    ShipType_Localised?: string;
    StoreOldShip?: string;
    StoreShipID?: ID;
    SellOldShip?: string;
    SellShipID?: ID;
    SellPrice?: number;
}
