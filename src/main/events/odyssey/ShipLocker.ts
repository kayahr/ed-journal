/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ShipLockerItem {
    Name: string;
    Name_Localised?: string;
    OwnerID: number;
    Count: number;
    MissionID?: number;
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
