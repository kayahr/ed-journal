/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written when zooming in on a signal using the FSS scanner.
 */
export interface FSSSignalDiscovered extends JournalEvent<"FSSSignalDiscovered"> {
    SignalName: string;
    SignalName_Localised?: string;
    SignalType?: string;

    /** The BGS state that triggered this event, if relevant. */
    SpawningState?: string;
    SpawningState_Localised?: string;

    /** The minor faction, if relevant */
    SpawningFaction?: string;
    SpawningFaction_Localised?: string;

    /** Remaining lifetime in seconds, if relevant */
    TimeRemaining?: number;

    SystemAddress: number;

    /** Threat level of a USS. */
    ThreatLevel?: number;

    USSType?: string;
    USSType_Localised?: string;

    /** True if it is a station. */
    IsStation?: boolean;
}
