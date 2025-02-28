/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Player's reputation on a scale of -100 to +100 with the superpowers. Written at startup after {@link Rank} and
 * {@link Progress}.
 *
 * Thresholds:
 *
 * * -100 to -90: Hostile
 * *  -90 to -35: Unfriendly
 * *  -35 to   4: Neutral
 * *    4 to  35: Cordial
 * *   35 to  90: Friendly
 * *   90 to 100: Allied
 */
export interface Reputation extends JournalEvent<"Reputation"> {
    Empire?: number;
    Federation?: number;
    Independent?: number;
    Alliance?: number;
}
