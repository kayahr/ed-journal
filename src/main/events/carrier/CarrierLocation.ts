/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { CarrierType } from "../types/CarrierType.js";
import type { ID } from "../types/ID.js";

export interface CarrierLocation extends JournalEvent<"CarrierLocation"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    StarSystem: string;
    SystemAddress: number;
    BodyID: ID;
}
