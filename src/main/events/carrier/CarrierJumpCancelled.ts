/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CarrierJumpCancelled extends JournalEvent<"CarrierJumpCancelled"> {
    CarrierID: number;
}
