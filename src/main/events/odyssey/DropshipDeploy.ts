/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

export interface DropshipDeploy extends JournalEvent<"DropshipDeploy"> {
    StarSystem: string;
    SystemAddress: number;
    Body: string;
    BodyID: number;
    OnStation: boolean;
    OnPlanet: boolean;
}
