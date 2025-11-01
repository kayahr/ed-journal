/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when player is rewarded for taking part in a combat zone.
 */
export interface FactionKillBond extends JournalEvent<"FactionKillBond"> {
    Reward: number;
    AwardingFaction: string;
    AwardingFaction_Localised?: string;
    VictimFaction: string;
    VictimFaction_Localised?: string;
}
