/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface NpcCrewRank extends JournalEvent<"NpcCrewRank"> {
    NpcCrewId: number;
    NpcCrewName: string;
    RankCombat: any;
}
