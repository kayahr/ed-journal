/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface DatalinkVoucher extends JournalEvent<"DatalinkVoucher"> {
    PayeeFaction: string;
    Reward: number;
    VictimFaction: string;
}
