/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface Embark extends JournalEvent<"Embark"> {
    SRV: boolean;
    Taxi: boolean;
    Multicrew: boolean;
    ID?: number;
    Crew?: Array<{
        Name: string;
        Role: string;
    }>;
    StarSystem: string;
    SystemAddress: number;
    Body: string;
    BodyID: number;
    OnStation: boolean;
    OnPlanet: boolean;
    StationName?: string;
    StationType?: string;
    MarketID?: number;
}
