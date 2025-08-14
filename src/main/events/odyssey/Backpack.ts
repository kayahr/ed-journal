/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface BackpackItem {
    Name: string;
    Name_Localised?: string;
    OwnerID: ID;
    Count: number;
    MissionID?: ID;
}

export interface Backpack extends JournalEvent<"Backpack"> {
    Items?: BackpackItem[];
    Components?: BackpackItem[];
    Consumables?: BackpackItem[];
    Data?: BackpackItem[];
}
