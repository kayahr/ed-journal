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

export interface ShipLocker extends JournalEvent<"ShipLocker"> {
    Items?: ShipLockerItem[];
    Components?: ShipLockerItem[];
    Consumables?: ShipLockerItem[];
    Data?: ShipLockerItem[];
}
