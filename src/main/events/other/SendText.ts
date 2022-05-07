/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface SendText extends JournalEvent<"SendText"> {
    Message: string;
    To: string;
    To_Localised?: string;
    Sent?: boolean;
}
