/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

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
    MarketID?: ID;
    Ship: string;
    ShipID: ID;
}
