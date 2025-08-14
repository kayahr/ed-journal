/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ModuleRetrieve extends JournalEvent<"ModuleRetrieve"> {
    Cost?: number;
    EngineerModifications?: string;
    Hot?: boolean;
    Level?: number;
    MarketID?: ID;
    Quality?: number;
    RetrievedItem: string;
    RetrievedItem_Localised?: string;
    Ship: string;
    ShipID: ID;
    Slot: string;
    SwapOutItem?: string;
    SwapOutItem_Localised?: string;
}
