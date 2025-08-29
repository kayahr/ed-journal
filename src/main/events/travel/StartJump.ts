/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { StarType } from "../types/StarType.js";

/** The type of jump. */
export type JumpType = "Hyperspace" | "Supercruise";

/**
 * Written at the start of a hyperspace or supercruise jump (start of countdown)
 */
export interface StartJump extends JournalEvent<"StartJump"> {
    /** The type of jump. */
    JumpType: JumpType;

    /** Name of destination system (for a hyperspace jump) */
    StarSystem?: string;

    SystemAddress?: number;

    /** Star type (Only for a hyperspace jump) */
    StarClass?: StarType;

    /** True if player is in a taxi. */
    Taxi?: boolean;
}
