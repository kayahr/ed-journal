/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface RestockVehicle extends JournalEvent<"RestockVehicle"> {
    Cost: number;
    Count: number;
    Loadout: string;
    Type: string;
    Type_Localised?: string;
    ID?: number;
}
