/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { StarType } from "../types/StarType.ts";

/**
 * Written when selecting a star system to jump to.
 *
 * Note, when following a multi-jump route, this will typically appear for the next star, during a jump, ie
 * after "StartJump" but before the "FSDJump"
 */
export interface FSDTarget extends JournalEvent<"FSDTarget"> {
    Name: string;
    RemainingJumpsInRoute?: number;
    StarClass?: StarType;
    SystemAddress: ID;
}
