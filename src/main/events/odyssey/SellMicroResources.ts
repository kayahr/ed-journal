/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { MicroResource } from "../types/MicroResource.js";

export interface SellMicroResources extends JournalEvent<"SellMicroResources"> {
    TotalCount: number;
    MicroResources: MicroResource[];
    Price: number;
    MarketID: number;
}
