/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ShipRedeemed extends JournalEvent<"ShipRedeemed"> {
    ShipType: string;
    ShipType_Localised: string;
    NewShipID: ID;
}
