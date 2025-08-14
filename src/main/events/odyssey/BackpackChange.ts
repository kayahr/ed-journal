/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ChangedBackpackItem {
    Name: string;
    Name_Localised?: string;
    OwnerID: ID;
    Count: number;
    Type: string;
    MissionID?: ID;
}

export interface BackpackChange extends JournalEvent<"BackpackChange"> {
    Added?: ChangedBackpackItem[];
    Removed?: ChangedBackpackItem[];
}
