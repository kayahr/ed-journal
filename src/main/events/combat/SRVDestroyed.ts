/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written when the player's SRV is destroyed.
 */
export interface SRVDestroyed extends JournalEvent<"SRVDestroyed"> {
    ID: ID;
    SRVType?: string;
    SRVType_Localised?: string;
}
