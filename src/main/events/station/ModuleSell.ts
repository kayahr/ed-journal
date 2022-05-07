/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ModuleSell extends JournalEvent<"ModuleSell"> {
    MarketID?: number;
    SellItem: string;
    SellItem_Localised?: string;
    SellPrice: number;
    Ship: string;
    ShipID: number;
    Slot: string;
}
