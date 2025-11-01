/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when player has escaped interdiction.
 */
export interface EscapeInterdiction extends JournalEvent<"EscapeInterdiction"> {
    /** The interdicting pilot name. */
    Interdictor: string;
    Interdictor_Localised?: string;

    /** Whether player or NPC. */
    IsPlayer: boolean;
}
