/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { CarrierType } from "../types/CarrierType.ts";
import type { ID } from "../types/ID.ts";

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
