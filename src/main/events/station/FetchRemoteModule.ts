/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */
import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface FetchRemoteModule extends JournalEvent<"FetchRemoteModule"> {
    ServerId: number;
    Ship: string;
    ShipID: ID;
    StorageSlot: number;
    StoredItem: string;
    StoredItem_Localised?: string;
    TransferCost: number;
    TransferTime?: number;
}
