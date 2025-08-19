/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { CarrierType } from "../types/CarrierType.js";
import type { ID } from "../types/ID.js";

export interface CarrierJumpRequest extends JournalEvent<"CarrierJumpRequest"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    SystemName: string;
    Body?: string;
    SystemAddress: number;
    BodyID: ID;
    DepartureTime?: string;
}
