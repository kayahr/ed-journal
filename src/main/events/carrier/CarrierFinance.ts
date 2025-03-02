/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Change to tax rate or reserve
 */
export interface CarrierFinance extends JournalEvent<"CarrierFinance"> {
    CarrierID: number;
    TaxRate?: number;
    CarrierBalance: number;
    ReserveBalance: number;
    AvailableBalance: number;
    ReservePercent: number;
    TaxRate_rearm?: number;
    TaxRate_refuel?: number;
    TaxRate_repair?: number;
    TaxRate_pioneersupplies?: number;
}
