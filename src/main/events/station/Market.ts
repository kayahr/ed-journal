/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { StationType } from "../types/StationType.ts";

export interface Market extends JournalEvent<"Market"> {
    MarketID: ID;
    StarSystem: string;
    StationName: string;
    StationType?: StationType;
    CarrierDockingAccess?: string;
}

/**
 * Extended market data written to separate 'Market.json' file.
 */
export interface ExtendedMarket extends Market {
    Items: Array<{
        id: number;
        Name: string;
        Name_Localised: string;
        Category: string;
        Category_Localised: string;
        BuyPrice: number;
        SellPrice: number;
        MeanPrice: number;
        StockBracket: number;
        DemandBracket: number;
        Stock: number;
        Demand: number;
        Consumer: boolean;
        Producer: boolean;
        Rare: boolean;
    }>;
}

registerJournalEventUpdate<Market, Market>("Market", (from, to) => {
    if (to.StationType as string === "") {
        // Remove empty station type
        delete to.StationType;
    }
});
