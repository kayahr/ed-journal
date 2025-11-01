/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.ts";
import type { CarrierType } from "../types/CarrierType.ts";
import type { ID } from "../types/ID.ts";

export interface CarrierNameChange extends JournalEvent<"CarrierNameChange"> {
    CarrierID: ID;
    CarrierType?: CarrierType;
    Name: string;
    Callsign: string;
}

/** Vanguard introduces a bug writing the CarrierType with empty key */
interface BrokenCarrierNameChange extends CarrierNameChange {
    ""?: CarrierType;
}

registerJournalEventUpdate<BrokenCarrierNameChange, CarrierNameChange>("CarrierNameChange", (from, to) => {
    if (from[""] != null) {
        to.CarrierType = from[""];
        delete from[""];
    }
});
