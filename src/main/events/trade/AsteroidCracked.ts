/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when the player has broken up a "Motherlode" asteroid for mining.
 */
export interface AsteroidCracked extends JournalEvent<"AsteroidCracked"> {
    /** Name of nearest body. */
    Body: string;
}
