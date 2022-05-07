/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ShipyardNew extends JournalEvent<"ShipyardNew"> {
    NewShipID: number;
    ShipType: string;
    ShipType_Localised?: string;
}
