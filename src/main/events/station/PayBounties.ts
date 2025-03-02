/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface PayBounties extends JournalEvent<"PayBounties"> {
    AllFines?: boolean;
    Amount: number;
    BrokerPercentage?: number;
    Faction?: string;
    Faction_Localised?: string;
    ShipID: number;
}
