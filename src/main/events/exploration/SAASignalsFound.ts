/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when using SAA scanner on a planet or rings.
 */
export interface SAASignalsFound extends JournalEvent<"SAASignalsFound"> {
    SystemAddress: number;
    BodyName: string;
    BodyID: number;
    Signals: Array<{
        Type: string;
        Type_Localised?: string;
        Count: number;
    }>,
    Genuses?: Array<{
        Genus: string;
        Genus_Localised: string;
    }>
}
