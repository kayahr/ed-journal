/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ModuleBuyAndStore extends JournalEvent<"ModuleBuyAndStore"> {
    BuyItem: string;
    BuyItem_Localised?: string;
    BuyPrice: number;
    MarketID?: ID;
    Ship: string;
    ShipID: ID;
}
