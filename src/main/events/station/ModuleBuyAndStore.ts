/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ModuleBuyAndStore extends JournalEvent<"ModuleBuyAndStore"> {
    BuyItem: string;
    BuyItem_Localised?: string;
    BuyPrice: number;
    MarketID?: number;
    Ship: string;
    ShipID: number;
}
