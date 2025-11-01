/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * List of passengers in the ship. Written at startup when loading the saved game file.
 */
export interface Passengers extends JournalEvent<"Passengers"> {
    Manifest: Array<{
        MissionID: ID;
        Type: string;
        VIP: boolean;
        Wanted: boolean;
        Count: number;
    }>;
}
