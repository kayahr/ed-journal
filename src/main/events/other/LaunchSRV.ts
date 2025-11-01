/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface LaunchSRV extends JournalEvent<"LaunchSRV"> {
    Loadout: string;
    PlayerControlled: boolean;
    ID?: ID;
    SRVType?: string;
    SRVType_Localised?: string;
}
