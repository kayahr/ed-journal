/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 *
 * This script validates a separate JSON file (like Status.json) against the corresponding JSON schema to find
 * mismatches between TypeScript interfaces and the actual written file contents.
 *
 * Usage: node lib/tools/validate-file TYPE
 *
 * TYPE can be 'shiplocker', 'shipyard' or 'status'
 */

import "source-map-support/register";

import { readFile } from "fs/promises";
import { Schema, Validator } from "jsonschema";
import { join } from "path";

import { Journal } from "../main/Journal";
import type { JournalEvent } from "../main/JournalEvent";

const type = (process.argv[2] ?? "status");
const schemaFile = `${type}.schema.json`;
const methods: Record<string, () => AsyncGenerator<JournalEvent>> = {
    "status": Journal.prototype.watchStatus,
    "shipyard": Journal.prototype.watchShipyard,
    "shiplocker": Journal.prototype.watchShipLocker
};

class ValidationError extends Error {
    public constructor(message: string, event: JournalEvent) {
        super(`${message}:\n\n${JSON.stringify(event, undefined, 4)}`);
    }
}

(async () => {
    const validator = new Validator();
    const schema = JSON.parse((await readFile(join(__dirname, "..", schemaFile))).toString()) as Schema;

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
})().catch(console.error);
