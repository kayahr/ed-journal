/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface MaterialTrade extends JournalEvent<"MaterialTrade"> {
    MarketID: ID;
    Paid: {
        Category: string;
        Category_Localised?: string;
        Material: string;
        Material_Localised?: string;
        Quantity: number;
    };
    Received: {
        Category: string;
        Category_Localised?: string;
        Material: string;
        Material_Localised?: string;
        Quantity: number;
    };
    TraderType: string;
}
