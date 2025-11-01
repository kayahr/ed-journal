/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Player's progress written at startup.
 */
export interface Progress extends JournalEvent<"Progress"> {
    /** Percent progress to next combat rank. */
    Combat: number;

    /** Percent progress to next trade rank. */
    Trade: number;

    /** Percent progress to next exploration rank. */
    Explore: number;

    /** Percent progress to next empire rank. */
    Empire: number;

    /** Percent progress to next federation rank. */
    Federation: number;

    /** Percent progress to next CQC rank. */
    CQC: number;

    /** Percent progress to next soldier rank. */
    Soldier?: number;

    /** Percent progress to next exobiologist rank. */
    Exobiologist?: number;
}
