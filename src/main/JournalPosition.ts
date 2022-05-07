/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

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
