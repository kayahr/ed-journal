/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface MissionFailed extends JournalEvent<"MissionFailed"> {
    MissionID: number;
    Name: string;
    Fine?: number;
}
