/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface BuyMicroResources extends JournalEvent<"BuyMicroResources"> {
    Name: string;
    Name_Localised: string;
    Category: string;
    Count: number;
    Price: number;
    MarketID: number;
}
