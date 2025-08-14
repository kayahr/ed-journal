/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface CollectItems extends JournalEvent<"CollectItems"> {
    Name: string;
    Name_Localised?: string;
    Type: string;
    OwnerID: ID;
    Count: number;
    Stolen: boolean;
}
