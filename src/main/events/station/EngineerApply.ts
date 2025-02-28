/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * This event is obsolete and no longer written since ED v3.0.
 */
export interface EngineerApply extends JournalEvent<"EngineerApply"> {
    Blueprint: string;
    Engineer: string;
    Level: number;
    Override?: string;
}
