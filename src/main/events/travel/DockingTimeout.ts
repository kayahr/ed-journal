/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";
import type { StationType } from "../types/StationType.js";

/**
 * Written when a docking request has timed out.
 */
export interface DockingTimeout extends JournalEvent<"DockingTimeout"> {
    StationName: string;
    StationType?: StationType;
    MarketID?: ID;
}
