/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when accessing the outfitting menu.
 */
export interface Outfitting extends JournalEvent<"Outfitting"> {
    MarketID: number;
    StarSystem: string;
    StationName: string;
}

/**
 * Extended outfitting info written to separate 'Outfitting.json' file.
 */
export interface ExtendedOutfitting extends Outfitting {
    Horizons: boolean;
    Items: Array<{
        id: number;
        Name: string;
        BuyPrice: number;
    }>;
}
