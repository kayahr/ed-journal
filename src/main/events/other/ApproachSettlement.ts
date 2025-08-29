/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";
import type { StationService } from "../types/StationService.js";

export interface ApproachSettlement extends JournalEvent<"ApproachSettlement"> {
    MarketID?: ID;
    Name: string;
    Name_Localised?: string;
    Latitude?: number;
    Longitude?: number;
    SystemAddress?: ID;
    BodyID?: ID;
    BodyName?: string;
    StationFaction?: {
        Name: string;
        FactionState?: string;
    };
    StationGovernment?: string;
    StationGovernment_Localised?: string;
    StationAllegiance?: string;
    StationServices?: StationService[];
    StationEconomy?: string;
    StationEconomy_Localised?: string;
    StationEconomies?: Array<{
        Name: string;
        Name_Localised?: string;
        Proportion: number;
    }>;
}
