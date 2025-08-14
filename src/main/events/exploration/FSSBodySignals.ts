/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface FSSBodySignals extends JournalEvent<"FSSBodySignals"> {
    BodyName: string;
    BodyID: ID;
    SystemAddress: number;
    Signals: Array<{
        Type: string;
        Type_Localised: string;
        Count: number;
    }>;
}
