/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";
import type { StationType } from "../types/StationType.ts";

export interface Disembark extends JournalEvent<"Disembark"> {
    SRV: boolean;
    Taxi: boolean;
    Multicrew: boolean;
    ID?: ID;
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
