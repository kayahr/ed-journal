/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { MicroResource } from "../types/MicroResource.js";

export interface OldBuyMicroResources extends JournalEvent<"BuyMicroResources"> {
    Name: string;
    Name_Localised: string;
    Category: string;
    Count: number;
    Price: number;
    MarketID: number;
}

export interface NewBuyMicroResources extends JournalEvent<"BuyMicroResources"> {
    TotalCount: number;
    MicroResources: MicroResource[];
    Price: number;
    MarketID: number;
}

export type BuyMicroResources = OldBuyMicroResources | NewBuyMicroResources;
