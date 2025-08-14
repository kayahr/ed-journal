/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface StoredShips extends JournalEvent<"StoredShips"> {
    MarketID: ID;
    ShipsHere: Array<{
        Hot: boolean;
        Name?: string;
        ShipID: ID;
        ShipType: string;
        ShipType_Localised?: string;
        Value: number;
    }>;
    ShipsRemote: Array<{
        Hot: boolean;
        InTransit?: boolean;
        Name?: string;
        ShipID: ID;
        ShipMarketID?: ID;
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
