/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when player was killed.
 */
export interface Died extends JournalEvent<"Died"> {
    KillerName?: string;
    KillerName_Localised?: string;
    KillerShip?: string;
    KillerRank?: string;
}
