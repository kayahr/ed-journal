/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface Disembark extends JournalEvent<"Disembark"> {
    SRV: boolean;
    Taxi: boolean;
    Multicrew: boolean;
    ID?: ID;
    StarSystem: string;
    SystemAddress: number;
    Body: string;
    BodyID: ID;
    OnStation: boolean;
    OnPlanet: boolean;
    StationName?: string;
    StationType?: string;
    MarketID?: ID;
}
