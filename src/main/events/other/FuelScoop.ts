/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface FuelScoop extends JournalEvent<"FuelScoop"> {
    Scooped: number;
    Total: number;
}
