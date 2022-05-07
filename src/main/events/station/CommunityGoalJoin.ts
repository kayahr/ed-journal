/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface CommunityGoalJoin extends JournalEvent<"CommunityGoalJoin"> {
    Name: string;
    System: string;
    CGID?: number;
}
