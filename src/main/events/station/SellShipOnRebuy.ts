/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/** TODO Verify by getting destroyed and selling the ship. */
export interface SellShipOnRebuy extends JournalEvent<"SellShipOnRebuy"> {
    ShipType: string;
    System: string;
    SellShipId: number;
    ShipPrice: number;
}
