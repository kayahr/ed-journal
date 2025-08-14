/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/**
 * Written when the player requests a docking at a station.
 */
export interface DockingRequested extends JournalEvent<"DockingRequested"> {
    StationName: string;
    StationType?: string;
    MarketID?: ID;
    LandingPads?: {
        Small: number;
        Medium: number;
        Large: number;
    };
}
