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

    /** The player ID. Not set in older journals (before December 2018). */
    FID?: string;

    /** True when game has Horizons. Not set before Horizons. */
    Horizons?: boolean;

    /** True when game has Odyssey. Not set before Odyssey. */
    Odyssey?: boolean;

    /** The current ship type. Can be missing for unknown reasons, maybe a game bug. */
    Ship?: string;

    /** The ID of the current ship. Not set if player is currently in an Apex Shuttle. */
    ShipID?: ID;

    /** Localised ship type. Not always set unfortunately, so a custom translation from {@link Ship} value is needed. */
    Ship_Localised?: string;

    /** True if landed. */
    StartLanded?: boolean;

    /** True if starting dead. See {@link Resurrect}. */
    StartDead?: boolean;

    /** The game mode. Can be missing for unknown reasons, maybe a game bug. */
    GameMode?: GameMode;

    /** Name of the group (if in a group). Not set if game mode is Open or Solo. */
    Group?: string;

    /** Current credit balance. */
    Credits: number;

    /** Current loan. */
    Loan: number;

    /** User-defined ship name. Not set in journals from older game versions or when currently flying in an Apex Shuttle. */
    ShipName?: string;

    /** User-defined ship ID. Not set in journals from older game versions or when currently flying in an Apex Shuttle. */
    ShipIdent?: string;

    /** Current fuel level. Not set in journals from older game versions or when currently flying in an Apex Shuttle. */
    FuelLevel?: number;

    /** Size if main tank. Not set in journals from older game versions or when currently flying in an Apex Shuttle. */
    FuelCapacity?: number;

    /** The game language. Set since Odyssey Update 5 (July 2021). */
    language?: string;

    /** The game version. Set since Odyssey Update 5 (July 2021). */
    gameversion?: string;

    /** The game build. Set since Odyssey Update 5 (July 2021). */
    build?: string;
}
