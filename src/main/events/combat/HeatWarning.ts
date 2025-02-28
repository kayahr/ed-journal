/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when heat exceeds 100%.
 */
export interface HeatWarning extends JournalEvent<"HeatWarning"> {
}
