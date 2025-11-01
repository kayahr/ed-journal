/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/** TODO Verify by swapping ship and selling the old one at the same time. */
export interface ShipyardSwap extends JournalEvent<"ShipyardSwap"> {
    MarketID?: ID;
    ShipID: ID;
    ShipType: string;
    ShipType_Localised?: string;
    StoreOldShip?: string;
    StoreShipID?: ID;
    SellOldShip?: string;
    SellShipID?: ID;
}
