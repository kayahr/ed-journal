/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface MissionRedirected extends JournalEvent<"MissionRedirected"> {
    MissionID: ID;
    Name: string;
    LocalisedName?: string;
    NewDestinationStation: string;
    NewDestinationSystem: string;
    OldDestinationStation: string;
    OldDestinationSystem: string;
}
