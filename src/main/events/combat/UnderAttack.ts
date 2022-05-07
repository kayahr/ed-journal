/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when under fire (same time as the Under Attack voice message).
 */
export interface UnderAttack extends JournalEvent<"UnderAttack"> {
    Target?: "Fighter" | "Mothership" | "You";
}
