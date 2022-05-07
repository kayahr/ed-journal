/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface StoredShips extends JournalEvent<"StoredShips"> {
    MarketID: number;
    ShipsHere: Array<{
        Hot: boolean;
        Name?: string;
        ShipID: number;
        ShipType: string;
        ShipType_Localised?: string;
        Value: number;
    }>;
    ShipsRemote: Array<{
        Hot: boolean;
        InTransit?: boolean;
        Name?: string;
        ShipID: number;
        ShipMarketID?: number;
        ShipType: string;
        ShipType_Localised?: string;
        StarSystem?: string;
        TransferPrice?: number;
        TransferTime?: number;
        Value: number;
    }>;
    StarSystem: string;
    StationName: string;
}
