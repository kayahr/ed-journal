/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CarrierDepositFuel extends JournalEvent<"CarrierDepositFuel"> {
    CarrierID: number;
    Amount: number;
    Total: number;
}
