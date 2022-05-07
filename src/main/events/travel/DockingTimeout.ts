/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when a docking request has timed out.
 */
export interface DockingTimeout extends JournalEvent<"DockingTimeout"> {
    StationName: string;
    StationType?: string;
    MarketID?: number;
}
