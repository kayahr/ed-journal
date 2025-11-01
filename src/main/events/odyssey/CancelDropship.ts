/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface CancelDropship extends JournalEvent<"CancelDropship"> {
    Refund: number;
}
