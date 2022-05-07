/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface EjectCargo extends JournalEvent<"EjectCargo"> {
    Abandoned: boolean;
    Count: number;
    Type: string;
    Type_Localised?: string;
}
