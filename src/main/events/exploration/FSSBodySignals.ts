/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface FSSBodySignals extends JournalEvent<"FSSBodySignals"> {
    BodyName: string;
    BodyID: number;
    SystemAddress: number;
    Signals: Array<{
        Type: string;
        Type_Localised: string;
        Count: number;
    }>;
}
