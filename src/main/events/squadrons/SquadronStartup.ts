/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface SquadronStartup extends JournalEvent<"SquadronStartup"> {
    SquadronName: string;
    SquadronID?: ID;
    CurrentRank: number;
    CurrentRankName?: string;
    CurrentRankName_Localised?: string;
}
