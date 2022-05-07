/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */
import type { JournalEvent } from "../../JournalEvent";

export interface FetchRemoteModule extends JournalEvent<"FetchRemoteModule"> {
    ServerId: number;
    Ship: string;
    ShipID: number;
    StorageSlot: number;
    StoredItem: string;
    StoredItem_Localised?: string;
    TransferCost: number;
    TransferTime?: number;
}
