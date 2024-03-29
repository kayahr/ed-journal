/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

/**
 * When plotting a multi-star route, the file “NavRoute.json” is written in the same directory as the journal, with a
 * list of stars along that route.
 */
export interface NavRoute extends JournalEvent<"NavRoute"> {}

/**
 * Extended nav route data written to separate 'NavRoute.json' file.
 */
export interface ExtendedNavRoute extends NavRoute {
    Route: Array<{
        StarSystem: string;
        SystemAddress: number;
        StarPos: [ number, number, number ];
        StarClass: string;
    }>;
}
