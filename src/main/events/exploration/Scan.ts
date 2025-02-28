/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";

/**
 * Written on basic or detailed discovery scan of a star, planet or moon.
 *
 * This is also generated when scanning a navigation beacon in a populated system, to record info
 * about all the bodies in the system
 */
export interface Scan extends JournalEvent<"Scan"> {
    ScanType?: string;
    StarSystem?: string;
    SystemAddress?: number;

    /** Name of body. */
    BodyName: string;

    BodyID?: number;
    DistanceFromArrivalLS: number;

    /** Stellar classification. */
    StarType?: string;

    /** Star's heat classification (0-9). */
    Subclass?: number;

    /** Mass as multiple of Sol's mass. */
    StellarMass?: number;

    Radius?: number;
    AbsoluteMagnitude?: number;

    /** Rotation period in seconds. */
    RotationPeriod?: number;

    SurfaceTemperature?: number;
    Luminosity?: string;

    /** Age in millions of years. */
    Age_MY?: number;

    Rings?: Array<{
        InnerRad: number;
        MassMT: number;
        Name: string;
        OuterRad: number;
        RingClass: string;
    }>;

    WasDiscovered?: boolean;
    WasMapped?: boolean;

    /** Array of BodyType:BodyID pairs. */
    Parents?: Array<{
        Null?: number;
        Planet?: number;
        Ring?: number;
        Star?: number;
    }>;

    /** If planet/moon is tidally locked. */
    TidalLock?: boolean;

    /** Terraform state of planet/moon. */
    TerraformState?: string;

    PlanetClass?: string;
    Atmosphere?: string;
    AtmosphereType?: string;
    AtmosphereComposition?: Array<{
        Name: string;
        Percent: number;
    }>;
    Volcanism?: string;
    SurfaceGravity?: number;
    SurfacePressure?: number;
    Landable?: boolean;
    Materials?: Array<{
        Name: string;
        Name_Localised?: string;
        Percent: number;
    }>;
    Composition?: {
        Ice: number;
        Metal: number;
        Rock: number;
    };
    ReserveLevel?: string;

    /** Axial tilt if rotating. */
    AxialTilt?: number;

    SemiMajorAxis?: number;
    Eccentricity?: number;
    OrbitalInclination?: number;
    Periapsis?: number;
    OrbitalPeriod?: number;

    MassEM?: number;
    AscendingNode?: number;
    MeanAnomaly?: number;
}

interface DeprecatedScan extends JournalEvent<"Scan"> {
    // Changed from an object to an array of objects in newer versions.
    Materials?: { [ name: string ]: number };
}

registerJournalEventUpdate<DeprecatedScan, Scan>("Scan", (from, to)  => {
    if (from.Materials != null && !(from.Materials instanceof Array)) {
        to.Materials = Object.entries(from.Materials).map(
            ([ Name, Percent ]) => ({ Name, Percent }));
    }
});
