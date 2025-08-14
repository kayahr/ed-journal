/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";
import type { MicroResource } from "../types/MicroResource.js";

export interface TradeMicroResources extends JournalEvent<"TradeMicroResources"> {
    Offered: MicroResource[];
    TotalCount: number;
    Received: string;
    Received_Localised?: string;
    Count: number;
    Category: string;
    MarketID: ID;
}
