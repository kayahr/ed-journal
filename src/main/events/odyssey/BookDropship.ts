/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface BookDropship extends JournalEvent<"BookDropship"> {
    Cost: number;
    DestinationSystem: string;
    DestinationLocation: string;
}
