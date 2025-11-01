/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface ReceiveText extends JournalEvent<"ReceiveText"> {
    Channel: string;
    From: string;
    From_Localised?: string;
    Message: string;
    Message_Localised?: string;
}
