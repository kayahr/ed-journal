/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface DropItems extends JournalEvent<"DropItems"> {
    Name: string;
    Type: string;
    OwnerID: number;
    Count: number;
}
