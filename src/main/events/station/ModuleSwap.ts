/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ModuleSwap extends JournalEvent<"ModuleSwap"> {
    FromItem: string;
    FromItem_Localised?: string;
    FromSlot: string;
    MarketID?: ID;
    Ship: string;
    ShipID: ID;
    ToItem: string;
    ToItem_Localised?: string;
    ToSlot: string;
}
