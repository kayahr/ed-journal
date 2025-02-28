/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when shields are disabled in combat, or recharged.
 */
export interface ShieldState extends JournalEvent<"ShieldState"> {
    /** false when disabled, true when restored. */
    ShieldsUp: boolean;
}
