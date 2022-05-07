/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when scanning a navigation beacon, before the scan data for all the bodies in the system is written into
 * the journal.
 */
export interface NavBeaconScan extends JournalEvent<"NavBeaconScan"> {
    NumBodies: number;
    SystemAddress?: number;
}
