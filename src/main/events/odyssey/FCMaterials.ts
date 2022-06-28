/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when trading with a Fleet Carrier Bartender for materials, a file is written with the price list.
 * Similar to the Shipyard and Cargo events, a brief entry is written in the journal.
 */
export interface FCMaterials extends JournalEvent<"FCMaterials"> {
    MarketID: number;
    CarrierName: string;
    CarrierID: string;
}

/**
 * Extended Fleet Carrier materials list written to separate 'FCMaterials.json' file.
 */
export interface ExtendedFCMaterials extends FCMaterials {
    Items: Array<{
        id: number;
        Name: string;
        Name_Localised?: string;
        Price: number;
        Stock: number;
        Demand: number;
    }>;
}
