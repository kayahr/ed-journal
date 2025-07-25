/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";
import type { ConflictFaction } from "../types/ConflictFaction.js";
import type { ConflictProgress } from "../types/ConflictProgress.js";
import type { PowerState } from "../types/PowerState.js";

/**
 * Written when jumping from one star to another.
 */
export interface FSDJump extends JournalEvent<"FSDJump"> {
    /** Name of destination star system. */
    StarSystem: string;

    SystemAddress?: number;

    /** Star position as array (x, y, z) in light years. */
    StarPos: [number, number, number];

    Body?: string;
    BodyID?: number;
    BodyType?: string;
    ControllingPower?: string;

    /** Distance jumped. */
    JumpDist: number;

    FuelUsed: number;
    FuelLevel: number;

    /** Whether FSD boost was used. */
    BoostUsed?: number;

    /** System's controlling faction. */
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

    /** Info for the local minor factions. */
    Factions?: Array<{
        Name: string;
        FactionState: string;
        Government: string;
        Influence: number;
        Allegiance: string;
        Happiness?: string;
        Happiness_Localised?: string;
        MyReputation?: number;
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
        SquadronFaction?: boolean;
        // TODO HappiestSystem: boolean;
        // TODO HomeSystem: boolean;
    }>;

    /** Info about local conflicts (if any) */
    Conflicts?: Array<{
        WarType: string;
        Status: string;
        Faction1: ConflictFaction;
        Faction2: ConflictFaction;
    }>;

    /** If starting in a system affected by the thargoid war. */
    ThargoidWar?: {
        CurrentState: string;
        NextStateSuccess: string;
        NextStateFailure: string;
        SuccessStateReached: boolean;
        WarProgress: number;
        RemainingPorts: number;
    };

    /** Names of any powers contesting the system, or the name of the controlling power. */
    Powers?: string[];

    /** The system's powerplay state. */
    PowerplayState?: PowerState;

    PowerplayStateControlProgress?: number;
    PowerplayStateReinforcement?: number;
    PowerplayStateUndermining?: number;
    PowerplayConflictProgress?: ConflictProgress[];

    Taxi?: boolean;
    Multicrew?: boolean;
}

interface DeprecatedFSDJump extends JournalEvent<"FSDJump"> {
    /** Renamed to SystemFaction in newer versions. */
    Faction?: string;

    /** Moved to StationFaction object in newer versions. */
    FactionState?: string;

    /** Renamed to SystemGovernment in newer versions. */
    Government?: string;

    /** Renamed to SystemGovernment_Localised in newer versions. */
    Government_Localised?: string;

    /** Renamed to SystemEconomy in newer versions. */
    Economy?: string;

    /** Renamed to SystemEconomy_Localised in newer versions. */
    Economy_Localised?: string;

    /** Renamed to SystemSecurity in newer versions. */
    Security?: string;

    /** Renamed to SystemSecurity_Localised in newer versions. */
    Security_Localised?: string;

    /** Renamed to SystemAllegiance in newer versions. */
    Allegiance?: string;

    /** Format changed to object in newer versions. */
    SystemFaction?: string;
}

registerJournalEventUpdate<DeprecatedFSDJump, FSDJump>("FSDJump", (from, to) => {
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
    if (from.FactionState != null && to.SystemFaction instanceof Object) {
        to.SystemFaction.FactionState = from.FactionState;
        delete from.FactionState;
    }
});
