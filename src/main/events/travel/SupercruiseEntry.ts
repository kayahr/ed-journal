/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/**
 * Written when entering supercruise from normal space.
 */
export interface SupercruiseEntry extends JournalEvent<"SupercruiseEntry"> {
    StarSystem: string;
    SystemAddress?: ID;
    Taxi?: boolean;
    Multicrew?: boolean;
}
