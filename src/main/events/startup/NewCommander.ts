/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when creating a new commander.
 */
export interface NewCommander extends JournalEvent<"NewCommander"> {
    /** The commander's name. */
    Name: string;

    /** The player ID. */
    FID?: string;

    /** The selected starter package. */
    Package: string;
}
