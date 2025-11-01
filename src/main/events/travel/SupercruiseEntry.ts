/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written when entering supercruise from normal space.
 */
export interface SupercruiseEntry extends JournalEvent<"SupercruiseEntry"> {
    StarSystem: string;
    SystemAddress?: ID;
    Taxi?: boolean;
    Multicrew?: boolean;
}
