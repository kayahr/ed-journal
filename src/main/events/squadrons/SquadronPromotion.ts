/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface SquadronPromotion extends JournalEvent<"SquadronPromotion"> {
    SquadronID: ID;
    SquadronName: string;
    OldRank: number;
    OldRankName: string;
    NewRank: number;
    NewRankName: string;
}
