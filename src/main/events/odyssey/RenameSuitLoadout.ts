/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";
import type { ID } from "../types/ID.ts";

export interface RenameSuitLoadout extends JournalEvent<"RenameSuitLoadout"> {
    SuitID: ID;
    SuitName: string;
    SuitName_Localised: string;
    LoadoutID: ID;
    LoadoutName: string;
}
