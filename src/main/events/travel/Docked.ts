/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";
import { correctStationService, type StationService } from "../types/StationService.js";

/**
 * Written when landing at landing pad in a space station, output, or surface settlement.
 *
 * The "anonymous docking" protocol comes into effect if you're either Wanted (ie have a local bounty)
 * or have an ActiveFine.
 */
export interface Docked extends JournalEvent<"Docked"> {
    /** The name of the station. */
    StationName: string;

    MarketID?: number;
    SystemAddress?: number;

    /** The type of the station. */
    StationType?: string;

    /** The name of the start system. */
    StarSystem?: string;

    /** True if landing with breached cockpit. */
    CockpitBreach?: boolean;

    /** The station's controlling faction. */
    StationFaction?: {
        Name: string;
        FactionState?: string;
    };

    StationAllegiance?: string;

    /** The station's primary economy. */
    StationEconomy?: string;
    StationEconomy_Localised?: string;

    /** List of station economies. */
    StationEconomies?: Array<{
        Name: string;
        Name_Localised?: string;
        Proportion: number;
    }>;

    StationGovernment?: string;
    StationGovernment_Localised?: string;
    DistFromStarLS?: number;
    StationServices?: StationService[];

    /** True if docking when wanted locally. */
    Wanted?: boolean;

    /** True if any fine is active. */
    ActiveFine?: boolean;

    LandingPads?: {
        Small: number;
        Medium: number;
        Large: number;
    };

    Taxi?: boolean;
    Multicrew?: boolean;
    StationState?: string;
    Security?: string;
    Security_Localised?: string;
}

interface DeprecatedDocked extends JournalEvent<"Docked"> {
    /** Old station services have different names which must be converted to new service names. */
    StationServices?: string[];

    /** Renamed to StationFaction in newer versions. */
    Faction?: string;

    /** Moved to StationFaction object in newer versions. */
    FactionState?: string;

    /** Renamed to StationGovernment in newer versions. */
    Government?: string;

    /** Renamed to StationGovernment_Localised in newer versions. */
    Government_Localised?: string;

    /** Renamed to StationEconomy in newer versions. */
    Economy?: string;

    /** Renamed to StationEconomy_Localised in newer versions. */
    Economy_Localised?: string;

    /** Renamed to StationAllegiance in newer versions. */
    Allegiance?: string;

    /** Format changed to object in newer versions. */
    StationFaction?: string;
}

registerJournalEventUpdate<DeprecatedDocked, Docked>("Docked", (from, to) => {
    if (from.Faction != null) {
        to.StationFaction = { Name: from.Faction };
        delete from.Faction;
    }
    if (from.Government != null) {
        to.StationGovernment = from.Government;
        delete from.Government;
    }
    if (from.Government_Localised != null) {
        to.StationGovernment_Localised = from.Government_Localised;
        delete from.Government_Localised;
    }
    if (from.Economy != null) {
        to.StationEconomy = from.Economy;
        delete from.Economy;
    }
    if (from.Economy_Localised != null) {
        to.StationEconomy_Localised = from.Economy_Localised;
        delete from.Economy_Localised;
    }
    if (from.Allegiance != null) {
        to.StationAllegiance = from.Allegiance;
        delete from.Allegiance;
    }
    if (typeof from.StationFaction === "string") {
        to.StationFaction = {
            Name: from.StationFaction
        };
    }
    if (from.FactionState != null && to.StationFaction instanceof Object) {
        to.StationFaction.FactionState = from.FactionState;
        delete from.FactionState;
    }
    if (from.StationServices instanceof Array) {
        to.StationServices = from.StationServices.map(correctStationService);
    }
});
