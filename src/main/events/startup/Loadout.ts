/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent.js";

/**
 * Written at startup when loading from main menu, when switching ships, after changing the ship in outfitting or
 * when docking SRV back in mothership.
 */
export interface Loadout extends JournalEvent<"Loadout"> {
    /** Current ship type. */
    Ship: string;

    /** Ship ID number. */
    ShipID: number;

    /** User-defined ship name. */
    ShipName: string;

    /** User-defined ship ID string. */
    ShipIdent: string;

    HullValue?: number;
    ModulesValue?: number;
    HullHealth?: number;

    /** Mass of hull and modules, excludes fuel and cargo. */
    UnladenMass?: number;

    FuelCapacity?: {
        Main: number;
        Reserve: number;
    };
    CargoCapacity?: number;

    /** Maximum jump range based on zero cargo, and just enough fuel for 1 jump. */
    MaxJumpRange?: number;

    Rebuy?: number;

    /** If wanted at startup. */
    Hot?: boolean;

    /** Array of installed items. */
    Modules: Array<{
        Slot: string;

        /** Module name. */
        Item: string;

        /** Indicates if module is on or off. */
        On: boolean;

        /** Power priority. */
        Priority: number;

        Health: number;
        Value?: number;

        /** For a passenger cabin, holds the number of places in the cabin. */
        AmmoInClip?: number;

        AmmoInHopper?: number;

        /** Set if module is engineered. */
        Engineering?: {
            /** The ID of the applied blueprint. */
            BlueprintID: number;

            /** The name of the applied blueprint. */
            BlueprintName: string;

            /** The name of the engineer. */
            Engineer: string;

            /** The ID of the engineer. */
            EngineerID: number;

            /** The experimental effect if applied. */
            ExperimentalEffect?: string;

            /** Localised name of applied experimental effect. */
            ExperimentalEffect_Localised?: string;

            /** The engineering level. */
            Level: number;

            Modifiers: Array<{
                Label: string;
                LessIsGood?: number;
                OriginalValue?: number;
                Value?: string | number;
                Value_Localised?: string;
                ValueStr?: string;
                ValueStr_Localised?: string;
            }>;

            Quality: number;
        };

        /** Replaced by Engineering object in newer version. */
        EngineerBlueprint?: string;

        /** Replaced by Engineering object in newer version. */
        EngineerLevel?: number;
    }>;
}
