/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface LaunchSRV extends JournalEvent<"LaunchSRV"> {
    Loadout: string;
    PlayerControlled: boolean;
    ID?: number;
    SRVType?: string;
    SRVType_Localised?: string;
}
