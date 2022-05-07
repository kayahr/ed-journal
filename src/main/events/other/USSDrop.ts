/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface USSDrop extends JournalEvent<"USSDrop"> {
    USSThreat: number;
    USSType: string;
    USSType_Localised?: string;
}
