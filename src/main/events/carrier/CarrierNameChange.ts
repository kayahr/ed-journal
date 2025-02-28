/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface CarrierNameChange extends JournalEvent<"CarrierNameChange"> {
    CarrierID: number;
    Name: string;
    Callsign: string;
}
