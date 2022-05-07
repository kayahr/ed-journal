/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when leaving supercruise for normal space.
 */
export interface SupercruiseExit extends JournalEvent<"SupercruiseExit"> {
    StarSystem: string;
    SystemAddress?: number;
    Body: string;
    BodyID?: number;
    BodyType: string;
    Taxi?: boolean;
    Multicrew?: boolean;
}
