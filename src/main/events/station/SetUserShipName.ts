/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface SetUserShipName extends JournalEvent<"SetUserShipName"> {
    Ship: string;
    ShipID: number;
    UserShipId: string;
    UserShipName: string;
}
