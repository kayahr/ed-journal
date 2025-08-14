/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface CarrierBuy extends JournalEvent<"CarrierBuy"> {
    CarrierID: ID;
    BoughtAtMarket: number;
    Location: string;
    SystemAddress: number;
    Price: number;
    Variant: string;
    Callsign: string;
}
