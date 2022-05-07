/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when scanning a body of a binary pair. YOu will now get an event detailing the orbital parameters of their
 * barycenter.
 */
export interface ScanBaryCentre extends JournalEvent<"ScanBaryCentre"> {
    StarSystem: string;
    SystemAddress: number;
    BodyID: number;
    SemiMajorAxis: number;
    Eccentricity: number;
    OrbitalInclination: number;
    Periapsis: number;
    OrbitalPeriod: number;
    AscendingNode: number;
    MeanAnomaly: number;
}
