/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when accessing shipyard in a station.
 */
export interface Shipyard extends JournalEvent<"Shipyard"> {
    MarketID: number;
    StarSystem: string;
    StationName: string;
}

/**
 * Extended shipyard info written to separate 'Shipyard.json' file.
 */
export interface ExtendedShipyard extends Shipyard {
    Horizons: boolean;
    AllowCobraMkIV: boolean;
    PriceList: Array<{
        id: number;
        ShipType: string;
        ShipType_Localised?: string;
        ShipPrice: number;
    }>;
}
