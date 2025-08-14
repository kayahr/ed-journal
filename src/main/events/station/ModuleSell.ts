/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ModuleSell extends JournalEvent<"ModuleSell"> {
    MarketID?: ID;
    SellItem: string;
    SellItem_Localised?: string;
    SellPrice: number;
    Ship: string;
    ShipID: ID;
    Slot: string;
}
