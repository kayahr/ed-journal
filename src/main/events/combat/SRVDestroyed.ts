/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when the player's SRV is destroyed.
 */
export interface SRVDestroyed extends JournalEvent<"SRVDestroyed"> {
    ID: number;
    SRVType?: string;
    SRVType_Localised?: string;
}
