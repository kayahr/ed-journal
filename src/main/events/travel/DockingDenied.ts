/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when the station denies a docking request.
 */
export interface DockingDenied extends JournalEvent<"DockingDenied"> {
    StationName: string;
    StationType?: string;
    MarketID?: number;
    Reason: string;
}
