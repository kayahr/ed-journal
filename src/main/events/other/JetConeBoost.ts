/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface JetConeBoost extends JournalEvent<"JetConeBoost"> {
    BoostValue: number;
}
