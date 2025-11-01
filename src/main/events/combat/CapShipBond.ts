/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when the player has been rewarded for a capital ship combat.
 */
export interface CapShipBond extends JournalEvent<"CapShipBond"> {
    /** Value of award. */
    Reward: number;
    AwardingFaction: string;
    AwardingFaction_Localised?: string;
    VictimFaction: string;
    VictimFaction_Localised?: string;
}
