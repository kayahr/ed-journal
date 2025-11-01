/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface TransferMicroResources extends JournalEvent<"TransferMicroResources"> {
    Transfers: Array<{
        Name: string;
        Name_Localised?: string;
        Category: string;
        /** New */
        LockerOldCount?: number;
        /** New */
        LockerNewCount?: number;
        /** Old */
        Count?: number;
        Direction: string;
    }>;
}
