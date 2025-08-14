/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface EngineerContribution extends JournalEvent<"EngineerContribution"> {
    Commodity?: string;
    Commodity_Localised?: string;
    Engineer: string;
    EngineerID?: ID;
    Faction?: string;
    Material?: string;
    Material_Localised?: string;
    Quantity: number;
    TotalQuantity: number;
    Type: string;
}
