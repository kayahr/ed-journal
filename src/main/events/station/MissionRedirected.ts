/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface MissionRedirected extends JournalEvent<"MissionRedirected"> {
    MissionID: number;
    Name: string;
    NewDestinationStation: string;
    NewDestinationSystem: string;
    OldDestinationStation: string;
    OldDestinationSystem: string;
}
