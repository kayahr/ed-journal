/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { CarrierType } from "../types/CarrierType.ts";
import type { ID } from "../types/ID.ts";

export interface CarrierLocation extends JournalEvent<"CarrierLocation"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    StarSystem: string;
    SystemAddress: ID;
    BodyID: ID;
}
