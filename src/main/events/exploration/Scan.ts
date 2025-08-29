/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";
import type { BodyType } from "../types/BodyType.js";
import type { ID } from "../types/ID.js";
import type { PlanetClass } from "../types/PlanetClass.js";
import type { StarType } from "../types/StarType.js";

/**
 * The scan type.
 *
 * - `AutoScan`: Automatic scan of nearby bodies after jumping into a system.
 * - `Basic`: A basic scan in older game versions, when no Detailed Surface Scanner was installed.
 * - `Detailed`: Normal scan made with Full Spectrum System Scanner or in older game versions a scan made with the Detailed Surface Scanner installed.
 * - `NavBeaconDetail`: Data learned by scanning a nav beacon.
 */
export type ScanType = "AutoScan" | "Basic" | "Detailed" | "NavBeaconDetail";

/**
 * Written on basic or detailed discovery scan of a star, planet or moon.
 *
 * This is also generated when scanning a navigation beacon in a populated system, to record info
 * about all the bodies in the system
 */
export interface Scan extends JournalEvent<"Scan"> {
    /** The scan type. Missing in older journals. Maybe it is safe to assume a missing scan type is an auto scan. */
    ScanType?: ScanType;

    /** Star system name. May not be set in older journals and must be taken from previous events (like {@link FSDJump} which always set a system name. */
    StarSystem?: string;

    /** The system ID. Not set in older journals. */
    SystemAddress?: ID;

    /** Name of body. */
    BodyName: string;

    BodyID?: ID;
    DistanceFromArrivalLS: number;

    /** Stellar classification. */
    StarType?: StarType;

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

    /** Array of BodyType:BodyID pairs describing the body hierarchy from direct parent to root. */
    Parents?: Array<{ [K in BodyType]: Record<K, number> & Partial<Record<Exclude<BodyType, K>, never>> }[BodyType]>;

    /** If planet/moon is tidally locked. */
    TidalLock?: boolean;

    /** Terraform state of planet/moon. */
    TerraformState?: string;

    PlanetClass?: PlanetClass;
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
