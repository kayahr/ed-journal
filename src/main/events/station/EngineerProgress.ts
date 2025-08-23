/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/** The possible progress states of an engineer. */
export type EngineerProgressState = "Known" | "Invited" | "Unlocked";

/**
 * Base interface for an engineer extended by {@link LockedEngineer} and {@link UnlockedEngineer}
 */
export interface EngineerBase {
    /** The engineer's name. */
    Engineer: string;

    /** The engineer ID. Not present in older events, therefor optional. */
    EngineerID?: ID;

    /** The engineer's progress state. */
    Progress: EngineerProgressState;
}

/**
 * A locked engineer (known or invited state) without rank and rang progress information.
 */
export interface LockedEngineer extends EngineerBase {
    Progress: "Known" | "Invited";
}

/**
 * An unlocked engineer with rank and rank progress.
 */
export interface UnlockedEngineer extends EngineerBase {
    Progress: "Unlocked";

    /** The unlocked rank. */
    Rank: number;

    RankProgress: number;
}

/** Union type of {@link LockedEngineer} and {@link UnlockedEngineer}. */
export type Engineer = LockedEngineer | UnlockedEngineer;

export interface EngineerProgress extends JournalEvent<"EngineerProgress"> {
    /**
     * List of engineers. As old event formats (containing only one engineer) are converted to new event format this list may only contain one engineer
     * and the event may be fired multiple times.
     */
    Engineers: Engineer[];
}

/**
 * Deprecated old engineer progress event containing only a single engineer. It is automatically converted to the new format.
 */
interface DeprecatedEngineerProgress extends JournalEvent<"EngineerProgress"> {
    Engineer?: string;
    EngineerID?: ID;
    Progress?: EngineerProgressState;
    Rank?: number;
}

registerJournalEventUpdate<DeprecatedEngineerProgress, EngineerProgress>("EngineerProgress", (from, to) => {
    if (from.Engineer != null) {
        // Convert single engineer into array
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
        // Remove broken events missing the crucial Engineer property
        to.Engineers = to.Engineers.filter(engineer => engineer.Engineer != null);
    }
});
