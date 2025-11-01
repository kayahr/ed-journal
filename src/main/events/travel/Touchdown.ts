/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

/**
 * Written when landing on a planet surface.
 */
export interface Touchdown extends JournalEvent<"Touchdown"> {
    Latitude?: number;
    Longitude?: number;
    StarSystem?: string;
    SystemAddress?: ID;
    Body?: string;
    BodyID?: ID;
    OnStation?: boolean;
    OnPlanet?: boolean;

    /** Included if within 50 km of a location listed in the nav panel. */
    NearestDestination?: string;
    NearestDestination_Localised?: string;

    /** False if ship was recalled from SRV, true if player is landing. */
    PlayerControlled?: boolean;

    Taxi?: boolean;
    Multicrew?: boolean;
}
