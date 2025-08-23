/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface SquadronDemotion extends JournalEvent<"SquadronDemotion"> {
    SquadronID: ID;
    SquadronName: string;
    OldRank: number;
    OldRankName: string;
    NewRank: number;
    NewRankName: string;
}
