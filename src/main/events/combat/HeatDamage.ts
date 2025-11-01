/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * When taking damage due to overheating.
 */
export interface HeatDamage extends JournalEvent<"HeatDamage"> {
}
