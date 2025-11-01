/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when the current player selects a new target.
 *
 * The amount of data written depends on the extent to which the target ship has been scanned
 */
export interface ShipTargeted extends JournalEvent<"ShipTargeted"> {
    /** False when losing target. */
    TargetLocked: boolean;

    Ship?: string;
    Ship_Localised?: string;
    ScanStage?: number;

    PilotName?: string;
    PilotName_Localised?: string;
    PilotRank?: string;

    ShieldHealth?: number;
    HullHealth?: number;

    Faction?: string;
    LegalStatus?: string;
    Bounty?: number;
    Subsystem?: string;
    Subsystem_Localised?: string;
    SubsystemHealth?: number;

    /** The power a scanned player is aligned to. Only set when player is also aligned to a power. */
    Power?: string;

    SquadronID?: string;
}
