/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/** TODO Verify by swapping ship and selling the old one at the same time. */
export interface ShipyardSwap extends JournalEvent<"ShipyardSwap"> {
    MarketID?: number;
    ShipID: number;
    ShipType: string;
    ShipType_Localised?: string;
    StoreOldShip?: string;
    StoreShipID?: number;
    SellOldShip?: string;
    SellShipID?: number;
}
