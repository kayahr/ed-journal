/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written when a ship-launched fighter is destroyed.
 */
export interface FighterDestroyed extends JournalEvent<"FighterDestroyed"> {
    ID?: ID;
}
