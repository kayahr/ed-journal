/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when a ship-launched fighter is destroyed.
 */
export interface FighterDestroyed extends JournalEvent<"FighterDestroyed"> {
    ID?: number;
}
