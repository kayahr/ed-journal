/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ShipLockerItem {
    Name: string;
    Name_Localised?: string;
    OwnerID: ID;
    Count: number;
    MissionID?: ID;
}

/**
 * Lists the contents of the ship locker, eg at startup. The full list is written into the journal at startup
 * (if in a ship) and when boarding a ship. For other updates the ship locker has to be watched separately.
 */
export interface ShipLocker extends JournalEvent<"ShipLocker"> {
    Items?: ShipLockerItem[];
    Components?: ShipLockerItem[];
    Consumables?: ShipLockerItem[];
    Data?: ShipLockerItem[];
}
