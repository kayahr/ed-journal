/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CarrierBuy extends JournalEvent<"CarrierBuy"> {
    CarrierID: number;
    BoughtAtMarket: number;
    Location: string;
    SystemAddress: number;
    Price: number;
    Variant: string;
    Callsign: string;
}
