/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type JournalEvent, registerJournalEventUpdate } from "../../JournalEvent.js";

export interface Pack {
    PackTheme: string;
    PackTier: number;
}

export interface CarrierStats extends JournalEvent<"CarrierStats"> {
    CarrierID: number;
    Callsign: string;
    Name: string;
    DockingAccess: string;
    AllowNotorious: boolean;
    FuelLevel: number;
    JumpRangeCurr: number;
    JumpRangeMax: number;
    PendingDecommission: boolean;
    SpaceUsage: {
        TotalCapacity: number;
        Crew: number;
        Cargo: number;
        CargoSpaceReserved: number;
        ShipPacks: number;
        ModulePacks: number;
        FreeSpace: number;
    };
    Finance: {
        CarrierBalance: number;
        ReserveBalance: number;
        AvailableBalance: number;
        ReservePercent?: number;
        TaxRate_rearm?: number;
        TaxRate_refuel?: number;
        TaxRate_repair?: number;
        TaxRate_pioneersupplies?: number;
        TaxRate_shipyard?: number;
        TaxRate_outfitting?: number;
    };
    Crew: Array<{
        CrewRole: string;
        Activated: boolean;
        Enabled?: boolean;
        CrewName?: string;
    }>;
    ShipPacks: Pack[];
    ModulePacks: Pack[];
}

interface DeprecatedCarrierStats extends JournalEvent<"CarrierStats"> {
    Finance: {
        /** Splitted into TaxRate_rearm, TaxRate_refuel and TaxRate_repair. */
        TaxRate?: number;
    };
}

registerJournalEventUpdate<DeprecatedCarrierStats, CarrierStats>("CarrierStats", (from, to) => {
    if (from.Finance.TaxRate != null) {
        to.Finance.TaxRate_rearm = from.Finance.TaxRate;
        to.Finance.TaxRate_refuel = from.Finance.TaxRate;
        to.Finance.TaxRate_repair = from.Finance.TaxRate;
        delete from.Finance.TaxRate;
    }
});
