/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/**
 * Written when leaving supercruise for normal space.
 */
export interface SupercruiseExit extends JournalEvent<"SupercruiseExit"> {
    StarSystem: string;
    SystemAddress?: number;
    Body: string;
    BodyID?: ID;
    BodyType: string;
    Taxi?: boolean;
    Multicrew?: boolean;
}
