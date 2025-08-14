/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

/** The game mode. */
export type GameMode = "Open" | "Solo" | "Group";

/**
 * Written at startup when loading from main menu into the game.
 */
export interface LoadGame extends JournalEvent<"LoadGame"> {
    /** The commander's name. */
    Commander: string;

    /** The player ID. */
    FID?: string;

    /** True when Horizons. */
    Horizons?: boolean;

    /** True when Odyssey. */
    Odyssey?: boolean;

    /** The current ship type. */
    Ship?: string;

    /** The ID of the current ship. */
    ShipID?: ID;

    /** Localised ship type. */
    Ship_Localised?: string;

    /** True if landed. */
    StartLanded?: boolean;

    /** True if starting dead. See {@link Resurrect}. */
    StartDead?: boolean;

    /** The game mode. */
    GameMode?: GameMode;

    /** Name of the group (if in a group. */
    Group?: string;

    /** Current credit balance. */
    Credits: number;

    /** Current loan. */
    Loan: number;

    /** User-defined ship name. */
    ShipName?: string;

    /** User-defines ship ID. */
    ShipIdent?: string;

    /** Current fuel level. */
    FuelLevel?: number;

    /** Size if main tank. */
    FuelCapacity?: number;

    language?: string;
    gameversion?: string;
    build?: string;
}
