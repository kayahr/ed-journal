/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface CargoDepot extends JournalEvent<"CargoDepot"> {
    MissionID: ID;
    UpdateType: string;
    CargoType?: string;
    CargoType_Localised?: string;
    Count?: number;
    StartMarketID: ID;
    EndMarketID: ID;
    ItemsCollected: number;
    ItemsDelivered: number;
    TotalItemsToDeliver: number;
    Progress: number;
}
