/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when player is awarded a bounty for a kill.
 */
export interface Bounty extends JournalEvent<"Bounty"> {
    /** An array of faction names and the reward values, as the target can have multiple bounties per faction. */
    Rewards?: Array<{
        Faction: string;
        Reward: number;
    }>;

    /** Type of ship or target (if skimmer). */
    Target?: string;
    Target_Localised?: string;

    /** The victim's faction. */
    VictimFaction: string;
    VictimFaction_Localised?: string;

    TotalReward?: number;

    /** If credit for the kill is shared with other players this has the number of other players involved. */
    SharedWithOthers?: number;

    /** Faction paying the bounty (when bounty is for a skimmer). */
    Faction?: string;
    Faction_Localised?: string;

    /** The reward (when bounty is for a skimmer). */
    Reward?: number;

    PilotName?: string;
    PilotName_Localised?: string;
}
