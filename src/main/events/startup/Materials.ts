/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/** A single material. */
export interface Material {
    /** The material count. */
    Count: number;

    /** The material name. */
    Name: string;

    /** The localised material name. */
    Name_Localised?: string;
}

/**
 * Written at startup when loading from main menu into the game. Indicates the number of materials in the player's
 * inventory.
 */
export interface Materials extends JournalEvent<"Materials"> {
    /** The list of raw materials. */
    Raw: Material[];

    /** The list of encoded materials. */
    Encoded: Material[];

    /** The list of manufactured materials. */
    Manufactured: Material[];
}
