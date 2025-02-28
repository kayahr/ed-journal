/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ConflictFaction } from "../types/ConflictFaction.js";
import type { PowerState } from "../types/PowerState.js";
import type { StationService } from "../types/StationService.js";

export interface CarrierJump extends JournalEvent<"CarrierJump"> {
    Docked: boolean;
    StationName: string;
    StationType: string;
    MarketID: number;
    StationFaction: {
        Name: string;
    };
    StationGovernment: string;
    StationGovernment_Localised: string;
    StationServices: StationService[];
    StationEconomy: string;
    StationEconomy_Localised: string;
    StationEconomies?: Array<{
        Name: string;
        Name_Localised?: string;
        Proportion: number;
    }>;
    Conflicts?: Array<{
        WarType: string;
        Status: string;
        Faction1: ConflictFaction;
        Faction2: ConflictFaction;
    }>;
    Powers?: string[];
    PowerplayState?: PowerState;
    Taxi?: boolean;
    Multicrew?: boolean;
    StarSystem: string;
    SystemAddress: number;
    StarPos: [ number, number, number ];
    SystemAllegiance: string;
    SystemEconomy: string;
    SystemEconomy_Localised: string;
    SystemSecondEconomy: string;
    SystemSecondEconomy_Localised: string;
    SystemGovernment: string;
    SystemGovernment_Localised: string;
    SystemSecurity: string;
    SystemSecurity_Localised: string;
    Population: number;
    Body: string;
    BodyID: number;
    BodyType: string;
    Factions?: Array<{
        Name: string;
        FactionState: string;
        Government: string;
        Influence: number;
        Allegiance: string;
        Happiness: string;
        Happiness_Localised: string;
        MyReputation: number;
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
    }>;
    SystemFaction?: {
        Name: string;
        FactionState?: string;
    };
}
