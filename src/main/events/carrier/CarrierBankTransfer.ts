/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CarrierBankTransfer extends JournalEvent<"CarrierBankTransfer"> {
    CarrierID: number;
    Deposit?: number;
    Withdraw?: number;
    PlayerBalance: number;
    CarrierBalance: number;
}
