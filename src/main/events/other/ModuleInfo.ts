/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { JournalEvent } from "../../JournalEvent";

export interface ModuleInfo extends JournalEvent<"ModuleInfo"> {
}

/**
 * Extended modules info written to separate 'ModulesInfo.json' file.
 */
export interface ExtendedModuleInfo extends ModuleInfo {
    Modules: Array<{
        Slot: string;
        Item: string;
        Power: number;
        Priority?: number;
    }>;
}
