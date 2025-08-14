/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ShipyardNew extends JournalEvent<"ShipyardNew"> {
    NewShipID: ID;
    ShipType: string;
    ShipType_Localised?: string;
}
