/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Player ranks written at startup.
 */
export interface Rank extends JournalEvent<"Rank"> {
    Combat: number;
    Trade: number;
    Explore: number;
    Empire: number;
    Federation: number;
    CQC: number;
    Soldier?: number;
    Exobiologist?: number;
}
