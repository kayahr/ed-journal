/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written after having identified all bodies in the system.
 */
export interface FSSAllBodiesFound extends JournalEvent<"FSSAllBodiesFound"> {
    SystemName: string;
    SystemAddress: ID;
    Count: number;
}
