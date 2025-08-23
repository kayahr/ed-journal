/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export type EngineerProgressState = "Known" | "Invited" | "Unlocked";

export interface EngineerBase {
    Engineer: string;
    EngineerID?: ID;
    Progress: EngineerProgressState;
}

export interface LockedEngineer extends EngineerBase {
    Progress: "Known" | "Invited";
}

export interface UnlockedEngineer extends EngineerBase {
    Progress: "Unlocked";
    RankProgress: number;
    Rank: number;
}

export type Engineer = LockedEngineer | UnlockedEngineer;

export interface EngineerProgress extends JournalEvent<"EngineerProgress"> {
    Engineers: Engineer[];
}

interface DeprecatedEngineerProgress extends JournalEvent<"EngineerProgress"> {
    Engineer?: string;
    EngineerID?: ID;
    Progress?: EngineerProgressState;
    Rank?: number;
}

registerJournalEventUpdate<DeprecatedEngineerProgress, EngineerProgress>("EngineerProgress", (from, to) => {
    if (from.Engineer != null) {
        to.Engineers = [
            from.Progress == "Unlocked"
                ? {
                    Engineer: from.Engineer,
                    EngineerID: from.EngineerID,
                    Progress: from.Progress,
                    Rank: from.Rank ?? 0,
                    RankProgress: 0
                } : {
                    Engineer: from.Engineer,
                    EngineerID: from.EngineerID,
                    Progress: from.Progress ?? "Known"
                }
        ];
        delete from.Engineer;
        delete from.EngineerID;
        delete from.Progress;
        delete from.Rank;
    }

    if (to.Engineers != null) {
        to.Engineers = to.Engineers.filter(engineer => engineer.Engineer != null);
    }
});
