/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface ModuleSellRemote extends JournalEvent<"ModuleSellRemote"> {
    SellItem: string;
    SellItem_Localised?: string;
    SellPrice: number;
    ServerId?: number;
    Ship: string;
    ShipID: ID;
    StorageSlot?: number;
}
