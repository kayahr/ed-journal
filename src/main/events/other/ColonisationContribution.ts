/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface ColonisationContributionResource {
    Name: string;
    Name_Localised: string;
    Amount: number;
}

export interface ColonisationContribution extends JournalEvent<"ColonisationContribution"> {
    MarketID: ID,
    Contributions: ColonisationContributionResource[];
}
