/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/**
 * When dropping out of supercruise at a targeted destination.
 */
export interface SupercruiseDestinationDrop extends JournalEvent<"SupercruiseDestinationDrop"> {
    /** The type fo destination being dropped into. */
    Type: string;
    Type_Localised?: string;

    /** Threat level. */
    Threat: number;

    /** Optional market id of the destination if dropping at a market. */
    MarketID?: ID;
}
