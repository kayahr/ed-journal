/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when materials are discarded.
 */
export interface MaterialDiscarded extends JournalEvent<"MaterialDiscarded"> {
    Category: string;
    Name: string;
    Count: number;
}
