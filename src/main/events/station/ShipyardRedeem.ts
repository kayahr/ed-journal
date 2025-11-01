/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ShipyardRedeem extends JournalEvent<"ShipyardRedeem"> {
    ShipType: string;
    ShipType_Localised: string;
    BundleID: ID;
    MarketID: ID;
}
