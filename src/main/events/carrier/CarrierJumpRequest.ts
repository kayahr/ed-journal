/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CarrierJumpRequest extends JournalEvent<"CarrierJumpRequest"> {
    CarrierID: number;
    SystemName: string;
    Body?: string;
    SystemAddress: number;
    BodyID: number;
    DepartureTime?: string;
}
