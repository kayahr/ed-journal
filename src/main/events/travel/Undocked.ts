/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { StationType } from "../types/StationType.ts";

/**
 * Written when liftoff from a landing pad in a station, outpost or settlement.
 */
export interface Undocked extends JournalEvent<"Undocked"> {
    StationName: string;
    MarketID?: ID;
    StationType?: StationType;
    Taxi?: boolean;
    Multicrew?: boolean;
}
