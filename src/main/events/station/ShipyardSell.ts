/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ShipyardSell extends JournalEvent<"ShipyardSell"> {
    MarketID?: ID;
    SellShipID: ID;
    ShipPrice: number;
    ShipType: string;
    ShipType_Localised?: string;
    System?: string;
    ShipMarketID?: ID;
}
