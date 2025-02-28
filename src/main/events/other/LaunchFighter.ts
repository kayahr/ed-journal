/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface LaunchFighter extends JournalEvent<"LaunchFighter"> {
    Loadout: string;
    PlayerControlled: boolean;
    ID?: number;
}
