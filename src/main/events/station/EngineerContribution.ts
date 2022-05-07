/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface EngineerContribution extends JournalEvent<"EngineerContribution"> {
    Commodity?: string;
    Commodity_Localised?: string;
    Engineer: string;
    EngineerID?: number;
    Faction?: string;
    Material?: string;
    Quantity: number;
    TotalQuantity: number;
    Type: string;
}
