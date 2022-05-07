/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CarrierFinance extends JournalEvent<"CarrierFinance"> {
    CarrierID: number;
    TaxRate: number;
    CarrierBalance: number;
    ReserveBalance: number;
    AvailableBalance: number;
    ReservePercent: number;
}
