/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface MissionFailed extends JournalEvent<"MissionFailed"> {
    MissionID: number;
    Name: string;
    LocalisedName?: string;
    Fine?: number;
}
