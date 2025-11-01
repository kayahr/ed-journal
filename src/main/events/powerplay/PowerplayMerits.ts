/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface PowerplayMerits extends JournalEvent<"PowerplayMerits"> {
    Power: string;
    MeritsGained: number;
    TotalMerits: number;
}
