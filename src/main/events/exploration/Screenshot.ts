/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when a screenshot has been taken.
 *
 * The latitude, longitude, altitude and heading will be included if on a planet or in low-altitude flight.
 */
export interface Screenshot extends JournalEvent<"Screenshot"> {
    /** Filename of screenshot. */
    Filename: string;

    /** Width in pixels. */
    Width: number;

    /** Height in pixels. */
    Height: number;

    /** Current star system. */
    System?: string;

    /** Name of nearest body. */
    Body?: string;

    Latitude?: number;
    Longitude?: number;
    Altitude?: number;
    Heading?: number;
}
