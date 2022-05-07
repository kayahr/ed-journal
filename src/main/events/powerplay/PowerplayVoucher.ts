/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface PowerplayVoucher extends JournalEvent<"PowerplayVoucher"> {
    Power: string;
    Systems: string[];
}
