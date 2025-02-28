/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";

/**
 * The information displayed in the statistics panel on the right side of the cockpit. Written at startup.
 *
 * Note: Times are in seconds.
 */
export interface Statistics extends JournalEvent<"Statistics"> {
    Bank_Account: {
        Current_Wealth?: number;
        Spent_On_Ships?: number;
        Spent_On_Outfitting?: number;
        Spent_On_Repairs?: number;
        Spent_On_Fuel?: number;
        Spent_On_Ammo_Consumables?: number;
        Insurance_Claims?: number;
        Spent_On_Insurance?: number;
        Owned_Ship_Count?: number;
        Spent_On_Suits?: number;
        Spent_On_Weapons?: number;
        Spent_On_Suit_Consumables?: number;
        Suits_Owned?: number;
        Weapons_Owned?: number;
        Spent_On_Premium_Stock?: number;
        Premium_Stock_Bought?: number;
    };
    Combat: {
        Bounties_Claimed?: number;
        Bounty_Hunting_Profit?: number;
        Combat_Bonds?: number;
        Combat_Bond_Profits?: number;
        Assassinations?: number;
        Assassination_Profits?: number;
        Highest_Single_Reward?: number;
        Skimmers_Killed?: number;
        OnFoot_Combat_Bonds?: number;
        OnFoot_Combat_Bonds_Profits?: number;
        OnFoot_Vehicles_Destroyed?: number;
        OnFoot_Ships_Destroyed?: number;
        Dropships_Taken?: number;
        Dropships_Booked?: number;
        Dropships_Cancelled?: number;
        ConflictZone_High?: number;
        ConflictZone_Medium?: number;
        ConflictZone_Low?: number;
        ConflictZone_Total?: number;
        ConflictZone_High_Wins?: number;
        ConflictZone_Medium_Wins?: number;
        ConflictZone_Low_Wins?: number;
        ConflictZone_Total_Wins?: number;
        Settlement_Defended?: number;
        Settlement_Conquered?: number;
        OnFoot_Skimmers_Killed?: number;
        OnFoot_Scavs_Killed?: number;
    };
    Crime: {
        Fines?: number;
        Total_Fines?: number;
        Bounties_Received?: number;
        Total_Bounties?: number;
        Highest_Bounty?: number;
        Notoriety?: number;
        Malware_Uploaded?: number;
        Settlements_State_Shutdown?: number;
        Production_Sabotage?: number;
        Production_Theft?: number;
        Total_Murders?: number;
        Citizens_Murdered?: number;
        Omnipol_Murdered?: number;
        Guards_Murdered?: number;
        Data_Stolen?: number;
        Goods_Stolen?: number;
        Sample_Stolen?: number;
        Total_Stolen?: number;
        Turrets_Destroyed?: number;
        Turrets_Overloaded?: number;
        Turrets_Total?: number;
        Value_Stolen_StateChange?: number;
        Profiles_Cloned?: number;
    };
    Smuggling: {
        Black_Markets_Traded_With?: number;
        Black_Markets_Profits?: number;
        Resources_Smuggled?: number;
        Average_Profit?: number;
        Highest_Single_Transaction?: number;
    };
    Trading: {
        Markets_Traded_With?: number;
        Market_Profits?: number;
        Resources_Traded?: number;
        Average_Profit?: number;
        Highest_Single_Transaction?: number;
        Data_Sold?: number;
        Goods_Sold?: number;
        Assets_Sold?: number;
    };
    Mining: {
        Mining_Profits?: number;
        Quantity_Mined?: number;
        Materials_Collected?: number;
    };
    Exploration: {
        Systems_Visited?: number;
        Exploration_Profits?: number;
        Planets_Scanned_To_Level_2?: number;
        Planets_Scanned_To_Level_3?: number;
        Highest_Payout?: number;
        Total_Hyperspace_Distance?: number;
        Total_Hyperspace_Jumps?: number;
        Greatest_Distance_From_Start?: number;
        Time_Played?: number;
        Efficient_Scans?: number;
        OnFoot_Distance_Travelled?: number;
        Shuttle_Journeys?: number;
        Shuttle_Distance_Travelled?: number;
        Spent_On_Shuttles?: number;
        First_Footfalls?: number;
        Planet_Footfalls?: number;
        Settlements_Visited?: number;
    };
    Passengers: {
        Passengers_Missions_Bulk?: number;
        Passengers_Missions_VIP?: number;
        Passengers_Missions_Delivered?: number;
        Passengers_Missions_Ejected?: number;
        Passengers_Missions_Accepted?: number;
        Passengers_Missions_Disgruntled?: number;
    };
    Search_And_Rescue: {
        SearchRescue_Traded?: number;
        SearchRescue_Profit?: number;
        SearchRescue_Count?: number;
        Salvage_Legal_POI?: number;
        Salvage_Legal_Settlements?: number;
        Salvage_Illegal_POI?: number;
        Salvage_Illegal_Settlements?: number;
        Maglocks_Opened?: number;
        Panels_Opened?: number;
        Settlements_State_FireOut?: number;
        Settlements_State_Reboot?: number;
    };
    Crafting?: {
        Count_Of_Used_Engineers?: number;
        Recipes_Generated?: number;
        Recipes_Generated_Rank_1?: number;
        Recipes_Generated_Rank_2?: number;
        Recipes_Generated_Rank_3?: number;
        Recipes_Generated_Rank_4?: number;
        Recipes_Generated_Rank_5?: number;
        Suit_Mods_Applied?: number;
        Weapon_Mods_Applied?: number;
        Suits_Upgraded?: number;
        Weapons_Upgraded?: number;
        Suits_Upgraded_Full?: number;
        Weapons_Upgraded_Full?: number;
        Suit_Mods_Applied_Full?: number;
        Weapon_Mods_Applied_Full?: number;
    };
    Crew?: {
        NpcCrew_TotalWages?: number;
        NpcCrew_Hired?: number;
        NpcCrew_Fired?: number;
        NpcCrew_Died?: number;
    };
    Multicrew?: {
        Multicrew_Time_Total?: number;
        Multicrew_Credits_Total?: number;
        Multicrew_Gunner_Time_Total?: number;
        Multicrew_Fighter_Time_Total?: number;
        Multicrew_Fines_Total?: number;
    };
    CQC?: {
        CQC_Credits_Earned?: number;
        CQC_KD?: number;
        CQC_Kills?: number;
        CQC_Time_Played?: number;
        CQC_WL?: number;
    };
    Material_Trader_Stats?: {
        Encoded_Materials_Traded?: number;
        Grade_1_Materials_Traded?: number;
        Grade_2_Materials_Traded?: number;
        Grade_3_Materials_Traded?: number;
        Grade_4_Materials_Traded?: number;
        Grade_5_Materials_Traded?: number;
        Materials_Traded?: number;
        Trades_Completed?: number;
        Raw_Materials_Traded?: number;
        Assets_Traded_In?: number;
        Assets_Traded_Out?: number;
    };
    TG_ENCOUNTERS?: {
        TG_ENCOUNTER_IMPRINT?: number;
        TG_ENCOUNTER_TOTAL?: number;
        TG_ENCOUNTER_TOTAL_LAST_SYSTEM?: string;
        TG_ENCOUNTER_TOTAL_LAST_TIMESTAMP?: string;
        TG_ENCOUNTER_TOTAL_LAST_SHIP?: string;
        TG_SCOUT_COUNT?: number;
    };
    FLEETCARRIER?: {
        FLEETCARRIER_EXPORT_TOTAL: number;
        FLEETCARRIER_IMPORT_TOTAL: number;
        FLEETCARRIER_TRADEPROFIT_TOTAL: number;
        FLEETCARRIER_TRADESPEND_TOTAL: number;
        FLEETCARRIER_STOLENPROFIT_TOTAL: number;
        FLEETCARRIER_STOLENSPEND_TOTAL: number;
        FLEETCARRIER_DISTANCE_TRAVELLED: number;
        FLEETCARRIER_TOTAL_JUMPS: number;
        FLEETCARRIER_SHIPYARD_SOLD: number;
        FLEETCARRIER_SHIPYARD_PROFIT: number;
        FLEETCARRIER_OUTFITTING_SOLD: number;
        FLEETCARRIER_OUTFITTING_PROFIT: number;
        FLEETCARRIER_REARM_TOTAL: number;
        FLEETCARRIER_REFUEL_TOTAL: number;
        FLEETCARRIER_REFUEL_PROFIT: number;
        FLEETCARRIER_REPAIRS_TOTAL: number;
        FLEETCARRIER_VOUCHERS_REDEEMED: number;
        FLEETCARRIER_VOUCHERS_PROFIT: number;
    };
    Exobiology?: {
        Organic_Genus_Encountered: number;
        Organic_Species_Encountered: number;
        Organic_Variant_Encountered: number;
        Organic_Data_Profits: number;
        Organic_Data: number;
        First_Logged_Profits: number;
        First_Logged: number;
        Organic_Systems: number;
        Organic_Planets: number;
        Organic_Genus: number;
        Organic_Species: number;
    };
}

interface DeprecatedStatistics extends JournalEvent<"Statistics"> {
    FLEETCARRIER?: {
        /** Was changed from string format to number format in newer version. */
        FLEETCARRIER_DISTANCE_TRAVELLED: string;
    };
}

registerJournalEventUpdate<DeprecatedStatistics, Statistics>("Statistics", (from, to) => {
    // Convert string format travel-distance to number format.
    if (typeof from.FLEETCARRIER?.FLEETCARRIER_DISTANCE_TRAVELLED === "string" && to.FLEETCARRIER != null) {
        to.FLEETCARRIER.FLEETCARRIER_DISTANCE_TRAVELLED
            = parseFloat(from.FLEETCARRIER?.FLEETCARRIER_DISTANCE_TRAVELLED);
    }
});
