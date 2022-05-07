/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when player was interdicted by player or NPC.
 */
export interface Interdicted extends JournalEvent<"Interdicted"> {
    /** Whether player submitted to the interdiction. */
    Submitted: boolean;

    /** Interdicting pilot name. */
    Interdictor: string;
    Interdictor_Localised?: string;

    /** Whether player or NPC. */
    IsPlayer: boolean;

    /** Combat rank (if player). */
    CombatRank?: number;

    /** Faction (if NPC). */
    Faction?: string;

    /** The power if NPC working for one. */
    Power?: string;
}
