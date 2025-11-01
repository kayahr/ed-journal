/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface ProspectedAsteroid extends JournalEvent<"ProspectedAsteroid"> {
    Materials: Array<{
        Name: string;
        Name_Localised?: string;
        Proportion: number;
    }>;
    MotherlodeMaterial?: string;
    MotherlodeMaterial_Localised?: string;
    Content: string;
    Content_Localised: string;
    Remaining: number;
}
