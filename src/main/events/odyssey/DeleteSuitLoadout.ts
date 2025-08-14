/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface DeleteSuitLoadout extends JournalEvent<"DeleteSuitLoadout"> {
    SuitID: ID;
    SuitName: string;
    SuitName_Localised: string;
    LoadoutID: ID;
    LoadoutName: string;
}
