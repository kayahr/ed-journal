/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * When the current plotted nav route is cleared.
 */
export interface NavRouteClear extends JournalEvent<"NavRouteClear"> {}
