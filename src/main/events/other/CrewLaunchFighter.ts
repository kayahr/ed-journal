/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CrewLaunchFighter extends JournalEvent<"CrewLaunchFighter"> {
    Crew: string;
}
