/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface CommunityGoal extends JournalEvent<"CommunityGoal"> {
    CurrentGoals: Array<{
        Bonus?: number;
        CGID: ID;
        CurrentTotal: number;
        Expiry: string;
        IsComplete: boolean;
        MarketName: string;
        NumContributors: number;
        PlayerContribution: number;
        PlayerInTopRank: boolean;
        PlayerPercentileBand: number;
        SystemName: string;
        TierReached?: string;
        Title: string;
        TopRankSize: number;
        TopTier?: {
            Name: string;
            Bonus: string;
        };
    }>;
}
