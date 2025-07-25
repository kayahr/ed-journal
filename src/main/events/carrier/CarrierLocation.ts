/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CarrierLocation extends JournalEvent<"CarrierLocation"> {
    CarrierID: number;
    StarSystem: string;
    SystemAddress: number;
    BodyID: number;
}
