/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface CrimeVictim extends JournalEvent<"CrimeVictim"> {
    Offender: string;
    CrimeType: string;
    Bounty?: number;
    Fine?: number;
}
