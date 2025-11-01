/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { MicroResource } from "../types/MicroResource.ts";

export interface OldBuyMicroResources extends JournalEvent<"BuyMicroResources"> {
    Name: string;
    Name_Localised: string;
    Category: string;
    Count: number;
    Price: number;
    MarketID: ID;
}

export interface NewBuyMicroResources extends JournalEvent<"BuyMicroResources"> {
    TotalCount: number;
    MicroResources: MicroResource[];
    Price: number;
    MarketID: ID;
}

export type BuyMicroResources = OldBuyMicroResources | NewBuyMicroResources;
