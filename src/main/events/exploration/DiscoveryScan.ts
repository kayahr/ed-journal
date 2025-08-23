/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/**
 * Written when using the discovery scanner, and new body discoveries are displayed in the cockpit info window.
 * Note you can get two or three of these in a row, where some bodies are discovered by the automatic passive scan,
 * before the active scan is complete.
 */
export interface DiscoveryScan extends JournalEvent<"DiscoveryScan"> {
    SystemAddress: ID;

    /** Number of new bodies discovered. */
    Bodies: number;
}
