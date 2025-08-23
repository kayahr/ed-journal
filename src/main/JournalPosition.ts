/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEventName } from "./AnyJournalEvent.js";

/**
 * A position within the journal indicated by file and byte offset. Also keeps track of the line number within the
 * journal file for better error messages.
 */
export interface JournalPosition {
    /** The filename of the journal file without directory. */
    file: string;

    /** Byte offset in the journal file. */
    offset: number;

    /** Line number within the journal file. */
    line: number;
}

/**
 * A named journal position. Can be an event name indicating the last occurrence of an event in the journal (if any) or 'start' or 'end', indicating
 * the beginning or end of the journal.
 */
export type NamedJournalPosition = JournalEventName | "start" | "end";
