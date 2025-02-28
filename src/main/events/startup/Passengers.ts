/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * List of passengers in the ship. Written at startup when loading the saved game file.
 */
export interface Passengers extends JournalEvent<"Passengers"> {
    Manifest: Array<{
        MissionID: number;
        Type: string;
        VIP: boolean;
        Wanted: boolean;
        Count: number;
    }>;
}
