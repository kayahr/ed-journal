/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface ShipyardRedeem extends JournalEvent<"ShipyardRedeem"> {
    ShipType: string;
    ShipType_Localised: string;
    BundleID: number;
    MarketID: number;
}
