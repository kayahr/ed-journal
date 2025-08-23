/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { CarrierType } from "../types/CarrierType.js";
import type { ID } from "../types/ID.js";

export interface CarrierBuy extends JournalEvent<"CarrierBuy"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    BoughtAtMarket: number;
    Location: string;
    SystemAddress: ID;
    Price: number;
    Variant: string;
    Callsign: string;
}
