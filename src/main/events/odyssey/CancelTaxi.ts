/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CancelTaxi extends JournalEvent<"CancelTaxi"> {
    Refund: number;
}
