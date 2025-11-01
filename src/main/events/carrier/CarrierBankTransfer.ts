/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { CarrierType } from "../types/CarrierType.ts";
import type { ID } from "../types/ID.ts";

export interface CarrierBankTransfer extends JournalEvent<"CarrierBankTransfer"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    Deposit?: number;
    Withdraw?: number;
    PlayerBalance: number;
    CarrierBalance: number;
}
