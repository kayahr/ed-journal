/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface BackpackItem {
    Name: string;
    Name_Localised?: string;
    OwnerID: number;
    Count: number;
    MissionID?: number;
}

export interface Backpack extends JournalEvent<"Backpack"> {
    Items?: BackpackItem[];
    Components?: BackpackItem[];
    Consumables?: BackpackItem[];
    Data?: BackpackItem[];
}
