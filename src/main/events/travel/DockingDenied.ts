/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/**
 * Written when the station denies a docking request.
 */
export interface DockingDenied extends JournalEvent<"DockingDenied"> {
    StationName: string;
    StationType?: string;
    MarketID?: ID;
    Reason: string;
}
