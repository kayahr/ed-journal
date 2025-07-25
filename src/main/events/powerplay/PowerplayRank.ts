/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface PowerplayRank extends JournalEvent<"PowerplayRank"> {
    Power: string;
    Rank: number;
}
