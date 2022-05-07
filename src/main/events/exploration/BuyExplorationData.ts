/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * Written when buying system data via the galaxy map.
 */
export interface BuyExplorationData extends JournalEvent<"BuyExplorationData"> {
    System: string;
    Cost: number;
}
