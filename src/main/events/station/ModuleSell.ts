/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ModuleSell extends JournalEvent<"ModuleSell"> {
    MarketID?: ID;
    SellItem: string;
    SellItem_Localised?: string;
    SellPrice: number;
    Ship: string;
    ShipID: ID;
    Slot: string;
}
