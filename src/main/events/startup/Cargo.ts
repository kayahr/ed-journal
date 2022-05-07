/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/** The vessel for which the cargo event is written. */
export type CargoVessel = "Ship" | "SRV";

/**
 * Written slightly later in startup after missions are initialized so cargo coming from an abandoned delivery mission
 * can be detected.
 *
 * The first Cargo event in the file will contain the full inventory.
 *
 * A simple event (with no Inventory property) is written to the main journal file when the cargo file is updated.
 */
export interface Cargo extends JournalEvent<"Cargo"> {
    /** Ship or SRV */
    Vessel?: CargoVessel;

    /** The total number of items. */
    Count?: number;

    /** Array of cargo. Not set when Cargo.json file was written instead. */
    Inventory?: Array<{
        /** The item name. */
        Name: string;

        /** Optional localized item name. */
        Name_Localised?: string;

        /** The number of items. */
        Count: number;

        /** How many of the items are stolen. */
        Stolen?: number;

        /** ID of the mission the item belongs to. */
        MissionID?: number;
    }>;
}
