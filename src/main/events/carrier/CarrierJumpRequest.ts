/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { CarrierType } from "../types/CarrierType.ts";
import type { ID } from "../types/ID.ts";

export interface CarrierJumpRequest extends JournalEvent<"CarrierJumpRequest"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    SystemName: string;
    Body?: string;
    SystemAddress: ID;
    BodyID: ID;
    DepartureTime?: string;
}
