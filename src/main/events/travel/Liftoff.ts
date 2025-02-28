/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when taking off from planet surface.
 */
export interface Liftoff extends JournalEvent<"Liftoff"> {
    Latitude?: number;
    Longitude?: number;
    StarSystem?: string;
    SystemAddress?: number;
    Body?: string;
    BodyID?: number;
    OnStation?: boolean;
    OnPlanet?: boolean;
    NearestDestination?: string;
    NearestDestination_Localised?: string;

    /** False if ship dismissed when player is in SRV, true if player is taking off. */
    PlayerControlled?: boolean;

    Taxi?: boolean;
    Multicrew?: boolean;
}
