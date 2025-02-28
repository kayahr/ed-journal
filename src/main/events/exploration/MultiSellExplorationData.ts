/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when selling exploration data in Cartographics, a page at a time.
 */
export interface MultiSellExplorationData extends JournalEvent<"MultiSellExplorationData"> {
    Discovered: Array<{
        SystemName: string;
        SystemName_Localised?: string;
        NumBodies: number;
    }>;
    BaseValue: number;
    Bonus: number;
    TotalEarnings?: number;
}
