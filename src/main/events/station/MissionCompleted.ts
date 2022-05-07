/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface MissionCompleted extends JournalEvent<"MissionCompleted"> {
    Commodity?: string;
    Commodity_Localised?: string;
    CommodityReward?: Array<{
        Count: number;
        Name: string;
        Name_Localised?: string;
    }>;
    Count?: number;
    NewDestinationStation?: string;
    DestinationStation?: string;
    NewDestinationSystem?: string;
    DestinationSystem?: string;
    Donation?: string | number; // TODO WHat the heck, number is older, string is newer but number makes more sense?
    Donated?: number;
    Faction: string;
    KillCount?: number;
    FactionEffects?: Array<{
        Faction: string;
        Effects: Array<{
            Effect: string;
            Effect_Localised?: string;
            Trend: string;
        }>;
        Influence: Array<{
            System?: number; // TODO Is this the same as SystemAddress?
            SystemAddress?: number;
            Trend: string;
            Influence?: string;
        }>;
        ReputationTrend?: string;
        Reputation: string;
    }>;
    MissionID: number;
    Name: string;
    PermitsAwarded?: string[];
    Reward?: number;
    MaterialsReward?: Array<{
        Name: string;
        Name_Localised: string;
        Category: string;
        Category_Localised: string;
        Count: number;
    }>;
    Target?: string;
    TargetType?: string;
    TargetType_Localised?: string;
    TargetFaction?: string;
}
