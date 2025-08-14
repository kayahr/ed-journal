/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ShipyardTransfer extends JournalEvent<"ShipyardTransfer"> {
    Distance: number;
    MarketID?: ID;
    ShipID: ID;
    ShipMarketID?: ID;
    ShipType: string;
    ShipType_Localised?: string;
    System: string;
    TransferPrice: number;
    TransferTime?: number;
}
