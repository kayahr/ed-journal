/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ShipyardTransfer extends JournalEvent<"ShipyardTransfer"> {
    Distance: number;
    MarketID?: number;
    ShipID: number;
    ShipMarketID?: number;
    ShipType: string;
    ShipType_Localised?: string;
    System: string;
    TransferPrice: number;
    TransferTime?: number;
}
