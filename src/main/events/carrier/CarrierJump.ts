/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { BodyType } from "../types/BodyType.ts";
import type { ConflictFaction } from "../types/ConflictFaction.ts";
import type { ConflictProgress } from "../types/ConflictProgress.ts";
import type { ID } from "../types/ID.ts";
import type { PowerState } from "../types/PowerState.ts";
import type { StationService } from "../types/StationService.ts";
import type { StationType } from "../types/StationType.ts";

export interface CarrierJump extends JournalEvent<"CarrierJump"> {
    Docked: boolean;
    OnFoot?: boolean;
    StationName?: string;
    StationType?: StationType;
    MarketID?: ID;
    StationFaction?: {
        Name: string;
    };
    StationGovernment?: string;
    StationGovernment_Localised?: string;
    StationServices?: StationService[];
    StationEconomy?: string;
    StationEconomy_Localised?: string;
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
    PowerplayStateControlProgress?: number;
    PowerplayStateReinforcement?: number;
    PowerplayStateUndermining?: number;
    PowerplayConflictProgress?: ConflictProgress[];
    Taxi?: boolean;
    Multicrew?: boolean;
    StarSystem: string;
    SystemAddress: ID;
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
    BodyID: ID;
    BodyType: BodyType;
    ControllingPower?: string;
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
