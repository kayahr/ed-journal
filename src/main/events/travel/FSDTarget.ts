/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when selecting a star system to jump to.
 *
 * Note, when following a multi-jump route, this will typically appear for the next star, during a jump, ie
 * after "StartJump" but before the "FSDJump"
 */
export interface FSDTarget extends JournalEvent<"FSDTarget"> {
    Name: string;
    RemainingJumpsInRoute?: number;
    StarClass?: string;
    SystemAddress: number;
}
