/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { MicroResource } from "../types/MicroResource.ts";

export interface DeliverPowerMicroResources extends JournalEvent<"DeliverPowerMicroResources"> {
    TotalCount: number;
    MicroResources: MicroResource[];
    MarketID: ID;
}
