/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { StationType } from "../types/StationType.ts";

/**
 * Written when the player cancels a docking request.
 */
export interface DockingCancelled extends JournalEvent<"DockingCancelled"> {
    StationName?: string;
    MarketID?: ID;
    StationType?: StationType;
}
