/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/** Valid legal states. */
export type LegalState =
    | "Clean"
    | "IllegalCargo"
    | "Speeding"
    | "Wanted"
    | "Hostile"
    | "PassengerWanted"
    | "Warrant";

/** Valid "Flags" bits. */
export enum Flag {
    /** Docked oon a landing pad) */
    DOCKED                       = 1 << 0,

    /** Landed on planet surface. */
    LANDED                       = 1 << 1,
    LANDING_GEAR_DOWN            = 1 << 2,
    SHIELDS_UP                   = 1 << 3,
    SUPERCRUISE                  = 1 << 4,
    FLIGHT_ASSIST_OFF            = 1 << 5,
    HARDPOINTS_DEPLOYED          = 1 << 6,
    IN_WING                      = 1 << 7,
    LIGHTS_ON                    = 1 << 8,
    CARGO_SCOOP_DEPLOYED         = 1 << 9,
    SILENT_RUNNING               = 1 << 10,
    SCOOPING_FUEL                = 1 << 11,
    SRV_HANDBRAKE                = 1 << 12,
    SRV_TURRET_VIEW              = 1 << 13,
    SRV_TURRET_RETRACTED         = 1 << 14,
    SRV_DRIVE_ASSIST             = 1 << 15,
    FSD_MASS_LOCKED              = 1 << 16,
    FSD_CHARGING                 = 1 << 17,
    FSD_COOLDOWN                 = 1 << 18,

    /** Fuel lower than 25%. */
    LOW_FUEL                     = 1 << 19,

    /** Heat over 100% */
    OVERHEATING                  = 1 << 20,
    HAS_LAT_LONG                 = 1 << 21,
    IS_IN_DANGER                 = 1 << 22,
    BEING_INTERDICTED            = 1 << 23,
    IN_MAIN_SHIP                 = 1 << 24,
    IN_FIGHTER                   = 1 << 25,
    IN_SRV                       = 1 << 26,
    ANALYSIS_MODE                = 1 << 27,
    NIGHT_VISION                 = 1 << 28,

    /**
     * If set, the altitude value is based on the planet’s average radius (used at higher altitudes).
     * If not set, the Altitude value is based on a raycast to the actual surface below the ship/srv.
     */
    ALTITUDE_FROM_AVERAGE_RADIUS = 1 << 29,

    FSD_JUMP                     = 1 << 30,
    SRV_HIGH_BEAM                = 1 << 31
}

/** Valid "Flags2" bits. */
export enum Flag2 {
    ON_FOOT                 = 1 << 0,

    /** Or dropship/shuttle. */
    IN_TAXI                 = 1 << 1,

    /** In someone else's ship. */
    IN_MULTICREW            = 1 << 2,

    ON_FOOT_IN_STATION      = 1 << 3,
    ON_FOOT_ON_PLANET       = 1 << 4,
    AIM_DOWN_SIGHT          = 1 << 5,
    LOW_OXYGEN              = 1 << 6,
    LOW_HEALTH              = 1 << 7,
    COLD                    = 1 << 8,
    HOT                     = 1 << 9,
    VERY_COLD               = 1 << 10,
    VERY_HOT                = 1 << 11,
    GLIDE_MODE              = 1 << 12,
    ON_FOOT_IN_HANGAR       = 1 << 13,
    ON_FOOT_SOCIAL_SPACE    = 1 << 14,
    ON_FOOT_EXTERIOR        = 1 << 15,
    BREATHABLE_ATMOSPHERE   = 1 << 16,
    TELEPRESENCE_MULTICREW  = 1 << 17,
    PHYSICAL_MULTICREW      = 1 << 18,
    FSD_HYPERDRIVE_CHARGING = 1 << 19
}

/** Valid GUI focus values. */
export enum GuiFocus {
    NO_FOCUS         = 0,

    /** Right hand side. */
    INTERNAL_PANEL   = 1,

    /** Left hand side. */
    EXTERNAL_PANEL   = 2,
    COMMS_PANEL      = 3,
    ROLE_PANEL       = 4,
    STATION_SERVICES = 5,
    GALAXY_MAP       = 6,
    SYSTEM_MAP       = 7,
    ORRERY           = 8,
    FSS_MODE         = 9,
    SAA_MODE         = 10,
    CODEX            = 11
}

/**
 * Some information about the current state of the game written every few seconds to the file 'Status.json' in the
 * journal directory.
 *
 * The latitude or longitude need to change by 0.02 degrees to trigger an update when flying, or by 0.0005 degrees
 * when in the SRV.
 */
export interface Status extends JournalEvent<"Status"> {
    /** Multiple flags encoded as bits in an integer. */
    Flags: number;

    /** More flags, mainly for when on foot. */
    Flags2?: number;

    /** An array of 3 integers (0-8) representing energy distribution (in half-pips) */
    Pips?: [ number, number, number ];

    /** The currently selected firegroup number. */
    FireGroup?: number;

    /** The selected GUI screen. */
    GuiFocus?: GuiFocus;

    /** Fuel mass in tons. */
    Fuel?: {
        FuelMain: number;
        FuelReservoir: number;
    };

    /** Cargo mass in tons. */
    Cargo?: number;

    /** The current legal state. */
    LegalState?: LegalState;

    /** The latitude. Set when on or near a planet. */
    Latitude?: number;

    /** The altitude. Set when on or near a planet. */
    Altitude?: number;

    /** The longitude. Set when on or near a planet. */
    Longitude?: number;

    /** The current heading. Set when on or near a planet. */
    Heading?: number;

    /** The planet radius. Set when on or near a planet. */
    PlanetRadius?: number;

    BodyName?: string;

    /** The current credit balance. */
    Balance?: number;

    /** The selected destination if any. */
    Destination?: {
        System: number;
        Body: number;
        Name: string;
    };

    /** The oxygen level (0.0 .. 1.0). Only set when on foot. */
    Oxygen?: number;

    /** The health level (0.0 .. 1.0). Only set when on foot. */
    Health?: number;

    /** Temperature in Kelvin. Only set when on foot. */
    Temperature?: number;

    /** The name of the selected weapon. Only set when on foot. */
    SelectedWeapon?: string;
    SelectedWeapon_Localised?: string;

    /** The gravity relative to 1G. Only set when on foot. */
    Gravity?: number;
}
