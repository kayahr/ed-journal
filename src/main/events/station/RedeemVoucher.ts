/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface RedeemVoucher extends JournalEvent<"RedeemVoucher"> {
    Amount: number;
    BrokerPercentage?: number;
    Faction?: string;
    Factions?: Array<{
        Amount: number;
        Faction: string;
    }>;
    Type: string;
}
