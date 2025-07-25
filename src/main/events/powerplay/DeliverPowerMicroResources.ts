/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { MicroResource } from "../types/MicroResource.js";

export interface DeliverPowerMicroResources extends JournalEvent<"DeliverPowerMicroResources"> {
    TotalCount: number;
    MicroResources: MicroResource[];
    MarketID: number;
}
