/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ChangedBackpackItem {
    Name: string;
    Name_Localised?: string;
    OwnerID: number;
    Count: number;
    Type: string;
    MissionID?: number;
}

export interface BackpackChange extends JournalEvent<"BackpackChange"> {
    Added?: ChangedBackpackItem[];
    Removed?: ChangedBackpackItem[];
}
