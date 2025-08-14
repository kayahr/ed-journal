/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface EngineerProgress extends JournalEvent<"EngineerProgress"> {
    Engineers?: Array<{
        Engineer?: string;
        EngineerID?: ID;
        Progress: string;
        RankProgress?: number;
        Rank?: number;
    }>;
    Engineer?: string;
    EngineerID?: ID;
    Progress?: string;
    Rank?: number;
}
