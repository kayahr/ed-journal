/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * Written when selling exploration data in Cartographics.
 */
export interface SellExplorationData extends JournalEvent<"SellExplorationData"> {
    /** System names. */
    Systems: string[];

    /** Discovered bodies. */
    Discovered: string[];

    /** Value of systems. */
    BaseValue: number;

    /** Bonus for first discoveries. */
    Bonus: number;

    /** Total credits received (including for example the 200% bonus if rank 5 with Li Yong Rui) */
    TotalEarnings?: number;
}
