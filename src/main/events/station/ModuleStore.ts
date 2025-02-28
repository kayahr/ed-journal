/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface ModuleStore extends JournalEvent<"ModuleStore"> {
    Cost?: number;
    EngineerModifications?: string;
    Hot?: boolean;
    Level?: number;
    MarketID?: number;
    Quality?: number;
    ReplacementItem?: string;
    Ship: string;
    ShipID: number;
    Slot: string;
    StoredItem: string;
    StoredItem_Localised?: string;
}
