/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface Market extends JournalEvent<"Market"> {
    MarketID: number;
    StarSystem: string;
    StationName: string;
    StationType?: string;
    CarrierDockingAccess?: string;
}
