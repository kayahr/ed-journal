/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export type SignalType = "Outpost" | "StationCoriolis" | "FleetCarrier" | "StationONeilOrbis" | "NavBeacon" | "Megaship" | "Combat" | "Installation"
    | "StationONeilCylinder" | "Generic" | "ResourceExtraction" | "StationBernalSphere" | "TouristBeacon" | "Titan" | "StationMegaShip" | "USS" | "Codex"
    | "StationAsteroid" | "SquadronCarrier";

/**
 * Written when zooming in on a signal using the FSS scanner.
 */
export interface FSSSignalDiscovered extends JournalEvent<"FSSSignalDiscovered"> {
    SignalName: string;
    SignalName_Localised?: string;

    /** The type of the signal. May be missing in older journals. */
    SignalType?: SignalType;

    /** The BGS state that triggered this event, if relevant. */
    SpawningState?: string;
    SpawningState_Localised?: string;

    /** The minor faction, if relevant */
    SpawningFaction?: string;
    SpawningFaction_Localised?: string;

    /** Remaining lifetime in seconds, if relevant */
    TimeRemaining?: number;

    SystemAddress: ID;

    /** Threat level of a USS. */
    ThreatLevel?: number;

    USSType?: string;
    USSType_Localised?: string;

    SpawningPower?: string;
    OpposingPower?: string;

    /** True if it is a station. */
    IsStation?: boolean;
}
