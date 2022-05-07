/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface DeleteSuitLoadout extends JournalEvent<"DeleteSuitLoadout"> {
    SuitID: number;
    SuitName: string;
    SuitName_Localised: string;
    LoadoutID: number;
    LoadoutName: string;
}
