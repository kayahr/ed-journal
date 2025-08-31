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

/** The ring class (Icy, Metallic, Metal Rich or Rocky). */
export type RingClass
    = "eRingClass_Icy"
    | "eRingClass_Metalic"
    | "eRingClass_MetalRich"
    | "eRingClass_Rocky"
    ;

/** A ring of a planet, moon or star. */
export interface Ring {
    /** The ring name. */
    Name: string;

    /** The ring class. */
    RingClass: RingClass;

    /** The mass in mega tons. */
    MassMT: number;

    /** The inner ring radius in meters. */
    InnerRad: number;

    /** The outer ring radius in meters. */
    OuterRad: number;
}

/** The resource reserve level. */
export type ReserveLevel = "PristineResources" | "LowResources" | "DepletedResources" | "MajorResources" | "CommonResources";

/** General scan data for every type of scanned body. */
export interface ScanBody extends JournalEvent<"Scan"> {
    /** The scan type. Missing in older journals. Maybe it is safe to assume a missing scan type is an auto scan. */
    ScanType?: ScanType;

    /** Star system name. May not be set in older journals and must be taken from previous events (like {@link FSDJump} which always set a system name. */
    StarSystem?: string;

    /** The system ID. Not set in older journals. */
    SystemAddress?: ID;

    /** The planet name. */
    BodyName: string;

    /** The ID of the planet. Not set in older journals. */
    BodyID?: ID;

    /** The distance of the planet to the arrival star in light seconds. */
    DistanceFromArrivalLS: number;

    /** Set to true if planet has been discovered by someone already. */
    WasDiscovered?: boolean;

    /** Set to true if planet has been mapped by someone already. */
    WasMapped?: boolean;

    /** Array of BodyType:BodyID pairs describing the body hierarchy from direct parent to root. */
    Parents?: Array<{ [K in BodyType]: Record<K, number> & Partial<Record<Exclude<BodyType, K>, never>> }[BodyType]>;

    /** The semi major axis in meters. Not set in basic scans. */
    SemiMajorAxis?: number;

    /** Orbital eccentricity. Not set in older journal versions. */
    Eccentricity?: number;

    /** Orbital inclination in degrees. Not set in older journal versions. */
    OrbitalInclination?: number;

    /** Argument of periapsis in degrees. Not set in older journal versions. */
    Periapsis?: number;

    /** Orbital period in seconds. Not set in older journal versions. */
    OrbitalPeriod?: number;

    /** Ascending node in degrees. Not set in older journal versions. */
    AscendingNode?: number;

    /** Mean anomaly in degrees. Not set in older journal versions. */
    MeanAnomaly?: number;

    /** Axial tilt (in degrees) if rotating. Not set in basic scans. */
    AxialTilt?: number;

    /** The rings around the body. Not set in basic scans or when there are no rings. */
    Rings?: Ring[];
}

/** Scan of a body which is not a star, planet or moon. */
export interface ScanOther extends ScanBody {
    PlanetClass?: never;
    StarType?: never;
}

/**
 * Scan of a star. Can be recognized by the existence of a `StarType` property.
 */
export interface ScanStar extends ScanBody {
    PlanetClass?: never;

    /** Stellar classification. */
    StarType: StarType;

    /** Star's heat classification (0-9). Not set in older journal versions. */
    Subclass?: number;

    /** Mass as multiple of Sol's mass. */
    StellarMass: number;

    /** The radius of the star in meters. */
    Radius: number;

    /** The absolute magnitude. */
    AbsoluteMagnitude: number;

    /** Rotation period in seconds. */
    RotationPeriod: number;

    SurfaceTemperature: number;

    /** The star luminosity. Not set in older journal versions. */
    Luminosity?: string;

    /** Age in millions of years. */
    Age_MY: number;
}

/**
 * Scan of a planet or moon. Can be recognized by the existence of a `PlanetClass` property.
 */
export interface ScanPlanet extends ScanBody {
    StarType?: never;

    /** The radius in meters. */
    Radius: number;

    /** Rotation period in seconds. */
    RotationPeriod: number;

    /** The surface temperature in Kelvin. Missing in basic scans. */
    SurfaceTemperature?: number;

    /** True if planet/moon is tidally locked. Not set in basic scans. */
    TidalLock?: boolean;

    /** The Terraform state. Not set in basic scans. */
    TerraformState?: string;

    /** The planet class. */
    PlanetClass: PlanetClass;

    /** The atmosphere. Not set in basic scans. Empty if no atmosphere. */
    Atmosphere?: string;

    /** The atmosphere type. Not set in basic scans or no atmosphere is present. */
    AtmosphereType?: string;

    /** The atmosphere composition. Not set in basic scans or no atmosphere is present. */
    AtmosphereComposition?: Array<{
        /** Element name (Like Hydrogen, Helium, ...) */
        Name: string;

        /** The quantity in percent. */
        Percent: number;
    }>;

    /** The volcanism like for example 'minor nitrogen magma volcanism'. Empty string if none. Not set in basic scans. */
    Volcanism?: string;

    /** The surface gravity measured in m/s². */
    SurfaceGravity: number;

    /** The surface pressure in kPa. Not set in basic scans. */
    SurfacePressure?: number;

    /** True if ships can land on the planet/moon. Not set in basic scans. */
    Landable?: boolean;

    /** List of raw materials which can be gathered on the planet/moon. Not set if none. */
    Materials?: Array<{
        /** The material name like "tungsten". */
        Name: string;

        /** The quantity in percent. */
        Percent: number;
    }>;

    /** The composition of the planet/moon. Not set in basic scans or when planet/moon is not solid. */
    Composition?: {
        /** Quantity of ice in percent. */
        Ice: number;

        /** Quantity of metal in percent. */
        Metal: number;

        /** Quantity of rock in percent. */
        Rock: number;
    };

    /** The resource reserve level. */
    ReserveLevel?: ReserveLevel;

    /** Earth masses. */
    MassEM: number;
}

/**
 * Written on basic or detailed discovery scan of a star, planet, moon or ring.
 *
 * This is also generated when scanning a navigation beacon in a populated system, to record info
 * about all the bodies in the system
 */
export type Scan = ScanStar | ScanPlanet | ScanOther;

interface DeprecatedScan extends JournalEvent<"Scan"> {
    // Changed from an object to an array of objects in newer versions.
    Materials?: { [ name: string ]: number };
}

registerJournalEventUpdate<DeprecatedScan, Scan>("Scan", (from, to)  => {
    if (to.PlanetClass != null && from.Materials != null && !(from.Materials instanceof Array)) {
        to.Materials = Object.entries(from.Materials).map(
            ([ Name, Percent ]) => ({ Name, Percent }));
    }
});
