/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { StationType } from "../types/StationType.ts";

/**
 * Written when a docking request is granted.
 */
export interface DockingGranted extends JournalEvent<"DockingGranted"> {
    StationName: string;
    StationType?: StationType;
    MarketID?: ID;
    LandingPad: number;
}
