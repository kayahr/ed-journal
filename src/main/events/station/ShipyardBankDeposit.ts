/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ShipyardBankDeposit extends JournalEvent<"ShipyardBankDeposit"> {
    ShipType: string;
    ShipType_Localised: string;
    MarketID: ID;
}
