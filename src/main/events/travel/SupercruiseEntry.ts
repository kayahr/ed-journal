/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when entering supercruise from normal space.
 */
export interface SupercruiseEntry extends JournalEvent<"SupercruiseEntry"> {
    StarSystem: string;
    SystemAddress?: number;
    Taxi?: boolean;
    Multicrew?: boolean;
}
