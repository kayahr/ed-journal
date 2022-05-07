/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when the player requests a docking at a station.
 */
export interface DockingRequested extends JournalEvent<"DockingRequested"> {
    StationName: string;
    StationType?: string;
    MarketID?: number;
    LandingPads?: {
        Small: number,
        Medium: number,
        Large: number
    }
}
