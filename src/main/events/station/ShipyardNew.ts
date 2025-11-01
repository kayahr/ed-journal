/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ShipyardNew extends JournalEvent<"ShipyardNew"> {
    NewShipID: ID;
    ShipType: string;
    ShipType_Localised?: string;
}
