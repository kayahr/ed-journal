/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/** Accept some kill missions to verify */
export interface MissionAccepted extends JournalEvent<"MissionAccepted"> {
    Commodity?: string;
    Commodity_Localised?: string;
    Count?: number;
    DestinationStation?: string;
    DestinationSystem?: string;
    DestinationSettlement?: string;
    Expiry?: string;
    Faction: string;
    Influence?: string;
    KillCount?: number;
    LocalisedName?: string;
    MissionID: ID;
    Name: string;
    PassengerCount?: number;
    PassengerType?: string;
    PassengerVIPs?: boolean;
    PassengerWanted?: boolean;
    Reputation?: string;
    Reward?: number;
    Target?: string;
    Target_Localised?: string;
    TargetType?: string;
    TargetType_Localised?: string;
    TargetFaction?: string;
    Wing?: boolean;
    Donation?: string;
}
