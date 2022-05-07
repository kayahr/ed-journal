/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface EngineerProgress extends JournalEvent<"EngineerProgress"> {
    Engineers?: Array<{
        Engineer: string;
        EngineerID: number;
        Progress: string;
        RankProgress?: number;
        Rank?: number;
    }>,
    Engineer?: string;
    EngineerID?: number;
    Progress?: string;
    Rank?: number;
}
