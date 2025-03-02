/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface DropItems extends JournalEvent<"DropItems"> {
    Name: string;
    Name_Localised?: string;
    Type: string;
    OwnerID: number;
    Count: number;
}
