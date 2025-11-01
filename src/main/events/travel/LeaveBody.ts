/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written when flying away from a planet and distance increases above the "Orbital Cruise" altitude.
 */
export interface LeaveBody extends JournalEvent<"LeaveBody"> {
    StarSystem: string;
    SystemAddress: ID;
    Body: string;
    BodyID: ID;
}
