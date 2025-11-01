/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface PowerplayVote extends JournalEvent<"PowerplayVote"> {
    Power: string;
    System: string;
    Votes: number;
}
