/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

export interface NpcCrewPaidWage extends JournalEvent<"NpcCrewPaidWage"> {
    Amount: number;
    NpcCrewId: number;
    NpcCrewName: string;
}
