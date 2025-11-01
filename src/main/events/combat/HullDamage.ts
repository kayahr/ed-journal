/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when hull health drops below a threshold (20% steps).
 */
export interface HullDamage extends JournalEvent<"HullDamage"> {
    Health: number;

    /** True if player is piloting the ship/fighter taking damage. */
    PlayerPilot?: boolean;

    /** True for ship-launched fighter. */
    Fighter?: boolean;
}
