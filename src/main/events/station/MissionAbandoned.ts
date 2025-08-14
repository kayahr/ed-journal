/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface MissionAbandoned extends JournalEvent<"MissionAbandoned"> {
    MissionID: ID;
    Name: string;
    LocalisedName?: string;
    Fine?: number;
}
