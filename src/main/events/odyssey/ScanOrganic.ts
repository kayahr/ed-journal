/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ScanOrganic extends JournalEvent<"ScanOrganic"> {
    ScanType: string;
    Genus: string;
    Genus_Localised: string;
    Species: string;
    Species_Localised: string;
    SystemAddress: number;
    Body: number;
}
