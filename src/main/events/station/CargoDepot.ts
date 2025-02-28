/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CargoDepot extends JournalEvent<"CargoDepot"> {
    MissionID: number;
    UpdateType: string;
    CargoType?: string;
    CargoType_Localised?: string;
    Count?: number;
    StartMarketID: number;
    EndMarketID: number;
    ItemsCollected: number;
    ItemsDelivered: number;
    TotalItemsToDeliver: number;
    Progress: number;
}
