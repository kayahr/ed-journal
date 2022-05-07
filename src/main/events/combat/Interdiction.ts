/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when player has (attempted to) interdict another player or NPC.
 */
export interface Interdiction extends JournalEvent<"Interdiction"> {
    /** Whether interdiction has been successful. */
    Success: boolean;

    /** Victim pilot name. */
    Interdicted?: string;

    /** Whether player or NPC. */
    IsPlayer: boolean;

    /** Combat rank (if player). */
    CombatRank?: number;

    /** Faction (if NPC). */
    Faction?: string;

    /** Power (if NPC working for a power). */
    Power?: string;
}
