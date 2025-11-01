/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface PayFines extends JournalEvent<"PayFines"> {
    Amount: number;
    AllFines?: boolean;
    Faction?: string;
    Faction_Localised?: string;
    BrokerPercentage?: number;
    ShipID?: ID;
}
