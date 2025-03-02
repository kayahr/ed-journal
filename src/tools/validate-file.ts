/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 *
 * This script validates a separate JSON file (like Status.json) against the corresponding JSON schema to find
 * mismatches between TypeScript interfaces and the actual written file contents.
 *
 * Usage: node lib/tools/validate-file TYPE
 *
 * TYPE can be 'backpack', 'cargo', 'fcmaterials', 'market', 'modulesinfo', 'navroute', 'outfitting', 'shiplocker',
 * 'shipyard' or 'status'
 */

import "source-map-support/register.js";

import { readFile } from "fs/promises";
import { type Schema, Validator } from "jsonschema";
import { join } from "path";

import { Journal } from "../main/Journal.js";
import type { JournalEvent } from "../main/JournalEvent.js";

const type = (process.argv[2] ?? "status");
const schemaFile = `${type}.schema.json`;
const methods: Record<string, () => AsyncGenerator<JournalEvent>> = {
    backpack: Journal.prototype.watchBackpack,
    cargo: Journal.prototype.watchCargo,
    fcmaterials: Journal.prototype.watchFCMaterials,
    market: Journal.prototype.watchMarket,
    modulesinfo: Journal.prototype.watchModulesInfo,
    navroute: Journal.prototype.watchNavRoute,
    outfitting: Journal.prototype.watchOutfitting,
    shiplocker: Journal.prototype.watchShipLocker,
    shipyard: Journal.prototype.watchShipyard,
    status: Journal.prototype.watchStatus
};

class ValidationError extends Error {
    public constructor(message: string, event: JournalEvent) {
        super(`${message}:\n\n${JSON.stringify(event, undefined, 4)}`);
    }
}

const validator = new Validator();
const schema = JSON.parse((await readFile(join("lib", schemaFile))).toString()) as Schema;

const journal = await Journal.open();
process.on("SIGINT", () => {
    void journal.close();
});
for await (const status of methods[type].call(journal)) {
    const result = validator.validate(status, schema);
    if (result.errors.length > 0) {
        throw new ValidationError(result.errors[0].toString(), status);
    }
    console.log(status);
}
