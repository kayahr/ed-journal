/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ColonisationConstructionResource {
    Name: string;
    Name_Localised: string;
    RequiredAmount: number;
    ProvidedAmount: number;
    Payment: number;
}

export interface ColonisationConstructionDepot extends JournalEvent<"ColonisationConstructionDepot"> {
    MarketID: ID,
    ConstructionProgress: number;
    ConstructionComplete: boolean;
    ConstructionFailed: boolean;
    ResourcesRequired: ColonisationConstructionResource[];
}
