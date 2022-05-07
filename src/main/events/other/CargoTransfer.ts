/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CargoTransfer extends JournalEvent<"CargoTransfer"> {
    Transfers: Array<{
        Type: string;
        Type_Localised?: string;
        Count: number;
        Direction: string;
    }>;
}
