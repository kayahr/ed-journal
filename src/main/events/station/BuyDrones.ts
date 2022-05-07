/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface BuyDrones extends JournalEvent<"BuyDrones"> {
    BuyPrice: number;
    Count: number;
    TotalCost: number;
    Type: string;
}
