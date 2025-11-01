/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written at startup if player has pledged to a power.
 */
export interface Powerplay extends JournalEvent<"Powerplay"> {
    /** The name of the power. */
    Power: string;

    Rank: number;
    Merits: number;
    Votes?: number;

    /** Time in seconds. */
    TimePledged: number;
}
