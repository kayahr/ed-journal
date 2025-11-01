/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface FSSBodySignals extends JournalEvent<"FSSBodySignals"> {
    BodyName: string;
    BodyID: ID;
    SystemAddress: ID;
    Signals: Array<{
        Type: string;
        Type_Localised: string;
        Count: number;
    }>;
}
