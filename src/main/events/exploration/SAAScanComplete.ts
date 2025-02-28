/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written after using the Surface Area Analysis scanner.
 */
export interface SAAScanComplete extends JournalEvent<"SAAScanComplete"> {
    SystemAddress?: number;
    BodyName: string;
    BodyID: number;
    ProbesUsed: number;
    EfficiencyTarget: number;
}
