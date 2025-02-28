/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface ModuleSwap extends JournalEvent<"ModuleSwap"> {
    FromItem: string;
    FromItem_Localised?: string;
    FromSlot: string;
    MarketID?: number;
    Ship: string;
    ShipID: number;
    ToItem: string;
    ToItem_Localised?: string;
    ToSlot: string;
}
