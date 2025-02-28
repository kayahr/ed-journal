/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface RenameSuitLoadout extends JournalEvent<"RenameSuitLoadout"> {
    SuitID: number;
    SuitName: string;
    SuitName_Localised: string;
    LoadoutID: number;
    LoadoutName: string;
}
