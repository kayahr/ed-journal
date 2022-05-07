/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/** A faction in a conflict. */
export interface ConflictFaction {
    Name: string,
    Stake: string,
    WonDays: number
}
