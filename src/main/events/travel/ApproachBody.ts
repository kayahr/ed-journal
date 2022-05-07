/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written in Supercruise, and distance from planet drops to within the 'Orbital Cruise' zone.
 */
export interface ApproachBody extends JournalEvent<"ApproachBody"> {
    StarSystem: string;
    SystemAddress: number;
    Body: string;
    BodyID: number;
}
