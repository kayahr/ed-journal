/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface RepairDrone extends JournalEvent<"RepairDrone"> {
    HullRepaired: number;
    CockpitRepaired?: number;
    CorrosionRepaired?: number;
}
