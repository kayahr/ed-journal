/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/** Power states in Powerplay 1.0 */
export type PowerState1 = "InPrepareRadius" | "Prepared"  | "Exploited" | "Contested" | "Controlled" | "HomeSystem" | "Turmoil";

/** Power states in Powerplay 2.0 */
export type PowerState2 = "Unoccupied" | "Stronghold" | "Fortified";

export type PowerState = PowerState1 | PowerState2;
