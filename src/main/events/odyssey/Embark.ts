/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";
import type { StationType } from "../types/StationType.js";

export interface Embark extends JournalEvent<"Embark"> {
    SRV: boolean;
    Taxi: boolean;
    Multicrew: boolean;
    ID?: ID;
    Crew?: Array<{
        Name: string;
        Role: string;
    }>;
    StarSystem: string;
    SystemAddress: ID;
    Body: string;
    BodyID: ID;
    OnStation: boolean;
    OnPlanet: boolean;
    StationName?: string;
    StationType?: StationType;
    MarketID?: ID;
}
