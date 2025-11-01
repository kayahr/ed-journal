/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface CrewHire extends JournalEvent<"CrewHire"> {
    CrewID?: ID;
    CombatRank: number;
    Cost: number;
    Faction: string;
    Name: string;
}
