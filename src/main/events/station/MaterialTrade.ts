/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface MaterialTrade extends JournalEvent<"MaterialTrade"> {
    MarketID: number;
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
