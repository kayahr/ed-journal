/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when a new material is discovered.
 */
export interface MaterialDiscovered extends JournalEvent<"MaterialDiscovered"> {
    Category: string;
    Name: string;
    Name_Localised?: string;
    DiscoveryNumber: number;
}
