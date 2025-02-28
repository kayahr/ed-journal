/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written at start of the game loading process.
 */
export interface Commander extends JournalEvent<"Commander"> {
    /** The commander name. */
    Name: string;

    /** The player ID. */
    FID?: string;
}
