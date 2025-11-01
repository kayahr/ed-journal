/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written when performing a full system scan ("Honk")
 */
export interface FSSDiscoveryScan extends JournalEvent<"FSSDiscoveryScan"> {
    /** A value in range 0-1 showing how completely the system has been scanned. */
    Progress: number;

    /** Number of stellar bodies in system. */
    BodyCount: number;

    /** Number of non-body signals found. */
    NonBodyCount: number;

    SystemName?: string;
    SystemAddress?: ID;
}
