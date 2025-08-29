/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";
import type { BodyType } from "../types/BodyType.js";
import type { ConflictFaction } from "../types/ConflictFaction.js";
import type { ConflictProgress } from "../types/ConflictProgress.js";
import type { ID } from "../types/ID.js";
import type { PowerState } from "../types/PowerState.js";
import { correctStationService, type StationService } from "../types/StationService.js";
import type { StationType } from "../types/StationType.js";

/**
 * Written at startup or when being resurrected at a station.
 */
export interface Location extends JournalEvent<"Location"> {
    StarSystem: string;
    SystemAddress?: ID;

    /** Star position as array (x, y, z) in light years. */
    StarPos: [number, number, number];

    Body: string;
    Body_Localised?: string;
    BodyID?: ID;
    BodyType: BodyType;
    ControllingPower?: string;
    DistFromStarLS?: number;
    Docked: boolean;
    Latitude?: number;
    Longitude?: number;
    StationName?: string;
    StationType?: StationType;
    MarketID?: ID;

    /** Star system's controlling faction. */
    SystemFaction?: {
        Name: string;
        FactionState?: string;
    };

    SystemAllegiance: string;
    SystemEconomy: string;
    SystemEconomy_Localised?: string;
    SystemSecondEconomy?: string;
    SystemSecondEconomy_Localised?: string;
    SystemGovernment: string;
    SystemGovernment_Localised?: string;
    SystemSecurity: string;
    SystemSecurity_Localised?: string;
    Population?: number;
    Wanted?: boolean;

    /** Info on local minor factions. */
    Factions?: Array<{
        Allegiance: string;
        FactionState: string;
        Government: string;
        Influence: number;
        Name: string;
        PendingStates?: Array<{
            State: string;
            Trend: number;
        }>;
        RecoveringStates?: Array<{
            State: string;
            Trend: number;
        }>;
        ActiveStates?: Array<{
            State: string;
        }>;
        Happiness?: string;
        Happiness_Localised?: string;
        MyReputation?: number;
        SquadronFaction?: boolean;
    }>;

    /** Info on local conflicts. */
    Conflicts?: Array<{
        WarType: string;
        Status: string;
        Faction1: ConflictFaction;
        Faction2: ConflictFaction;
    }>;

    /** Names of any powers contesting the system, or the name of the controlling power. */
    Powers?: string[];

    /** The system's powerplay state. */
    PowerplayState?: PowerState;

    PowerplayStateControlProgress?: number;
    PowerplayStateReinforcement?: number;
    PowerplayStateUndermining?: number;
    PowerplayConflictProgress?: ConflictProgress[];

    ThargoidWar?: {
        CurrentState: string;
        NextStateSuccess: string;
        NextStateFailure: string;
        SuccessStateReached: boolean;
        WarProgress: number;
        RemainingPorts: number;
    };

    StationFaction?: {
        Name: string;
        FactionState?: string;
    };
    StationGovernment?: string;
    StationGovernment_Localised?: string;
    StationAllegiance?: string;
    StationServices?: StationService[];
    StationEconomies?: Array<{
        Name: string;
        Name_Localised: string;
        Proportion: number;
    }>;

    Taxi?: boolean;
    Multicrew?: boolean;
    InSRV?: boolean;
    OnFoot?: boolean;

    StationEconomy?: string;
    StationEconomy_Localised?: string;
}

interface DeprecatedLocation extends JournalEvent<"Location"> {
    /** Old station services have different names which must be converted to new service names. */
    StationServices?: string[];

    /** Renamed to SystemFaction in newer versions. */
    Faction?: string;

    /** Moved to SystemFaction object in newer versions. */
    FactionState?: string;

    /** Renamed to SystemGovernment in newer version. */
    Government?: string;

    /** Renamed to SystemGovernment_Localised in newer version. */
    Government_Localised?: string;

    /** Renamed to SystemEconomy in newer version. */
    Economy?: string;

    /** Renamed to SystemEconomy_Localised in newer version. */
    Economy_Localised?: string;

    /** Renamed to SystemSecurity in newer version. */
    Security?: string;

    /** Renamed to SystemSecurity_Localised in newer version. */
    Security_Localised?: string;

    /** Renamed to SystemAllegiance in newer version. */
    Allegiance?: string;

    /** Format changed to object in newer versions. */
    SystemFaction?: string;

    /** Format changed to object in newer versions. */
    StationFaction?: string;
}

registerJournalEventUpdate<DeprecatedLocation, Location>("Location", (from, to) => {
    if (from.Faction != null) {
        to.SystemFaction = { Name: from.Faction };
        delete from.Faction;
    }
    if (from.Government != null) {
        to.SystemGovernment = from.Government;
        delete from.Government;
    }
    if (from.Government_Localised != null) {
        to.SystemGovernment_Localised = from.Government_Localised;
        delete from.Government_Localised;
    }
    if (from.Economy != null) {
        to.SystemEconomy = from.Economy;
        delete from.Economy;
    }
    if (from.Economy_Localised != null) {
        to.SystemEconomy_Localised = from.Economy_Localised;
        delete from.Economy_Localised;
    }
    if (from.Security != null) {
        to.SystemSecurity = from.Security;
        delete from.Security;
    }
    if (from.Security_Localised != null) {
        to.SystemSecurity_Localised = from.Security_Localised;
        delete from.Security_Localised;
    }
    if (from.Allegiance != null) {
        to.SystemAllegiance = from.Allegiance;
        delete from.Allegiance;
    }
    if (typeof from.SystemFaction === "string") {
        to.SystemFaction = {
            Name: from.SystemFaction
        };
    }
    if (typeof from.StationFaction === "string") {
        to.StationFaction = {
            Name: from.StationFaction
        };
    }
    if (from.FactionState != null && to.SystemFaction instanceof Object) {
        to.SystemFaction.FactionState = from.FactionState;
        delete from.FactionState;
    }
    if (from.StationServices instanceof Array) {
        to.StationServices = from.StationServices.map(correctStationService);
    }
    if (to.StationType as string === "") {
        // Remove empty station type
        delete to.StationType;
    }
});
