/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";
import type { ID } from "../types/ID.js";

export interface DropshipDeploy extends JournalEvent<"DropshipDeploy"> {
    StarSystem: string;
    SystemAddress: ID;
    Body: string;
    BodyID: ID;
    OnStation: boolean;
    OnPlanet: boolean;
}
