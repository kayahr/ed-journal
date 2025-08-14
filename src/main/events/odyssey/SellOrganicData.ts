/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface SellOrganicData extends JournalEvent<"SellOrganicData"> {
    MarketID: ID;
    BioData: Array<{
        Genus: string;
        Genus_Localised: string;
        Species: string;
        Species_Localised: string;
        Variant?: string;
        Variant_Localised?: string;
        Value: number;
        Bonus: number;
    }>;
}
