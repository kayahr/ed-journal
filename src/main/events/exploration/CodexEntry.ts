/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/**
 * Written when a new discovery is added to the Codex.
 */
export interface CodexEntry extends JournalEvent<"CodexEntry"> {
    EntryID: ID;
    Name: string;
    Name_Localised: string;
    SubCategory: string;
    SubCategory_Localised: string;
    Category: string;
    Category_Localised: string;
    Region: string;
    Region_Localised: string;
    System: string;
    SystemAddress: ID;
    BodyID?: ID;

    /** Added if within 50km of a location listed in the navigation panel. */
    NearestDestination?: string;
    NearestDestination_Localised?: string;

    Latitude?: number;
    Longitude?: number;
    IsNewEntry?: boolean;
    VoucherAmount?: number;

    Traits?: string[];
    NewTraitsDiscovered?: boolean;
}
