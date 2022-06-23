/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when accessing the outfitting menu.
 */
export interface Outfitting extends JournalEvent<"Outfitting"> {
    MarketID: number;
    StarSystem: string;
    StationName: string;
}
