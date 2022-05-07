/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface PowerplayCollect extends JournalEvent<"PowerplayCollect"> {
    Count: number;
    Power: string;
    Type: string;
    Type_Localised?: string;
}
