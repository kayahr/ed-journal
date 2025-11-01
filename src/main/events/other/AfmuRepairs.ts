/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface AfmuRepairs extends JournalEvent<"AfmuRepairs"> {
    Module: string;
    Module_Localised?: string;
    Health: number;
    FullyRepaired: boolean;
}
