/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface SharedBookmarkToSquadron extends JournalEvent<"SharedBookmarkToSquadron"> {
    SquadronID: ID;
    SquadronName: string;
}
