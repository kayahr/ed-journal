/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/** TODO Revalidate? Some mismatches between Log and API doc */
export interface StoredModules extends JournalEvent<"StoredModules"> {
    Items: Array<{
        BuyPrice: number;
        EngineerModifications?: string;
        Hot: boolean;
        InTransit?: boolean;
        Level?: number;
        MarketID?: number;
        Name: string;
        Name_Localised?: string;
        Quality?: number;
        StarSystem?: string;
        StorageSlot: number;
        TransferCost?: number;
        TransferTime?: number;
    }>;
    MarketID: number;
    StarSystem: string;
    StationName: string;
}
