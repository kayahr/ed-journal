/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when player resets the game.
 */
export interface ClearSavedGame extends JournalEvent<"ClearSavedGame"> {
    /** The commander name. */
    Name: string;

    /** The player ID. */
    FID?: string;
}
