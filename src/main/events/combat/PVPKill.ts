/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when this player has killed another player.
 */
export interface PVPKill extends JournalEvent<"PVPKill"> {
    /** Name of victim. */
    Victim: string;

    /** Victim's combat rank. */
    CombatRank: number;
}
