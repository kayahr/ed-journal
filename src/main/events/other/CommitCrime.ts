/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CommitCrime extends JournalEvent<"CommitCrime"> {
    Bounty?: number;
    CrimeType: string;
    Faction: string;
    Fine?: number;
    Victim?: string;
    Victim_Localised?: string;
}
