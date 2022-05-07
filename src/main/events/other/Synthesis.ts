/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { JournalEvent, registerJournalEventUpdate } from "../../JournalEvent";

export interface Synthesis extends JournalEvent<"Synthesis"> {
    Materials: Array<{
        Count?: number;
        Name: string;
        Name_Localised?: string;
        Percent?: number;
    }>;
    Name: string;
}

interface DeprecatedSynthesis extends JournalEvent<"Synthesis"> {
    Materials?: { [ name: string ]: number };
}

registerJournalEventUpdate("Synthesis", (json: DeprecatedSynthesis | Synthesis)  => {
    // Since ED 2.3 the Materials data has changed from an object to an array of objects.
    if (json.Materials != null && !(json.Materials instanceof Array)) {
        json.Materials = Object.entries(json.Materials).map(
            ([ Name, Percent ]) => ({ Name, Percent }));
    }
});
