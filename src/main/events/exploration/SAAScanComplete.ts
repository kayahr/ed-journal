/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written after using the Surface Area Analysis scanner.
 */
export interface SAAScanComplete extends JournalEvent<"SAAScanComplete"> {
    SystemAddress?: ID;
    BodyName: string;
    BodyID: ID;
    ProbesUsed: number;
    EfficiencyTarget: number;
}
