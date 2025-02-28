/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface PayLegacyFines extends JournalEvent<"PayLegacyFines"> {
    Amount: number;
    BrokerPercentage?: number;
}
