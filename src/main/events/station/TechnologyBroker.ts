/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface TechnologyBroker extends JournalEvent<"TechnologyBroker"> {
    BrokerType: string;
    Commodities: Array<{
        Count: number;
        Name: string;
        Name_Localised?: string;
    }>;
    ItemsUnlocked: Array<{
        Name: string;
        Name_Localised?: string;
    }>;
    MarketID: ID;
    Materials: Array<{
        Category: string;
        Count: number;
        Name: string;
        Name_Localised?: string;
    }>;
}
