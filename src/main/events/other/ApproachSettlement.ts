/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ApproachSettlement extends JournalEvent<"ApproachSettlement"> {
    MarketID?: number;
    Name: string;
    Name_Localised?: string;
    Latitude?: number;
    Longitude?: number;
    SystemAddress?: number;
    BodyID?: number;
    BodyName?: string;
}
