/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/** TODO Revalidate? Some mismatches between Log and API doc */
export interface StoredModules extends JournalEvent<"StoredModules"> {
    Items: Array<{
        BuyPrice: number;
        EngineerModifications?: string;
        Hot: boolean;
        InTransit?: boolean;
        Level?: number;
        MarketID?: ID;
        Name: string;
        Name_Localised?: string;
        Quality?: number;
        StarSystem?: string;
        StorageSlot: number;
        TransferCost?: number;
        TransferTime?: number;
    }>;
    MarketID: ID;
    StarSystem: string;
    StationName: string;
}
