/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CollectItems extends JournalEvent<"CollectItems"> {
    Name: string;
    Name_Localised?: string;
    Type: string;
    OwnerID: number;
    Count: number;
    Stolen: boolean;
}
