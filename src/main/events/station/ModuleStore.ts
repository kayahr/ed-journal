/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ModuleStore extends JournalEvent<"ModuleStore"> {
    Cost?: number;
    EngineerModifications?: string;
    Hot?: boolean;
    Level?: number;
    MarketID?: ID;
    Quality?: number;
    ReplacementItem?: string;
    Ship: string;
    ShipID: ID;
    Slot: string;
    StoredItem: string;
    StoredItem_Localised?: string;
}
