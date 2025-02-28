/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface MassModuleStore extends JournalEvent<"MassModuleStore"> {
    Items: Array<{
        EngineerModifications?: string;
        Hot?: boolean;
        Level?: number;
        Name: string;
        Name_Localised?: string;
        Quality?: number;
        Slot: string;
    }>;
    MarketID?: number;
    Ship: string;
    ShipID: number;
}
