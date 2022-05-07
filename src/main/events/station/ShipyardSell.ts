/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ShipyardSell extends JournalEvent<"ShipyardSell"> {
    MarketID?: number;
    SellShipID: number;
    ShipPrice: number;
    ShipType: string;
    ShipType_Localised?: string;
    System?: string;
    ShipMarketID?: number;
}
