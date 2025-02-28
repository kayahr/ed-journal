/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/** Data about a single mission. */
export interface Mission {
    MissionID: number;
    Name: string;
    PassengerMission: boolean;

    /** Time left in seconds. */
    Expires: number;
}

/**
 * The player's missions. Written at startup.
 */
export interface Missions extends JournalEvent<"Missions"> {
    /** List of active missions. */
    Active: Mission[];

    /** List of completed missions. */
    Complete: Mission[];

    /** List of fails missions. */
    Failed: Mission[];
}
