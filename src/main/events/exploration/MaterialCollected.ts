/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written whenever materials are collected.
 */
export interface MaterialCollected extends JournalEvent<"MaterialCollected"> {
    /** Type of material. */
    Category: string;

    /** Name of material. */
    Name: string;
    Name_Localised?: string;

    /** Number of units collected. */
    Count: number;
}
