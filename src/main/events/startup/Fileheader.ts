/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.ts";

/**
 * The heading entry is added at the beginning of every file.
 *
 * The first event in a new journal file. If the play session goes on a long time, and the journal gets very large,
 * the file will be closed and a new file is started with an increased part number. See also the {@link Continued}
 * event.
 */
export interface Fileheader extends JournalEvent<"Fileheader"> {
    /** The file part number. */
    part: number;

    /** True when odyssey, false if other version. */
    Odyssey?: boolean;

    /** The language code. */
    language: string;

    /** Which version of the game produced the log (will indicate if beta). */
    gameversion: string;

    /** The game build number. */
    build: string;
}
