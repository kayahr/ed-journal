/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 *
 * This script validates Journal files against the JSON schema to find mismatches between TypeScript interfaces and
 * actual Journal events.
 *
 * Usage: node lib/tools/validate-journal [position]
 * `position` can be "start", "end" or the name of a specific Journal file to start at.
 */

import "source-map-support/register.js";

import { readFile } from "fs/promises";
import { type Schema, Validator } from "jsonschema";
import { join } from "path";

import type { AnyJournalEvent } from "../main/AnyJournalEvent.js";
import { Journal } from "../main/Journal.js";
import type { JournalPosition } from "../main/JournalPosition.js";

let position: JournalPosition | string = process.argv[2] ?? "start";
if (position !== "start" && position !== "end") {
    position = { file: position, offset: 0, line: 1 };
}

class ValidationError extends Error {
    public constructor(message: string, event: AnyJournalEvent) {
        super(`${message}:\n\n${JSON.stringify(event, undefined, 4)}`);
    }
}

const validator = new Validator();
const schema = JSON.parse((await readFile(join("lib", "journal-event.schema.json"))).toString()) as Schema;
const narrowedSchemas = new Map<string, Schema>();

const journal = await Journal.open({ position, watch: true });
process.on("SIGINT", () => {
    void journal.close();
});
let currentFile = "";
for await (const event of journal) {
    const file = journal.getPosition().file;
    if (file !== currentFile) {
        console.log("Validating file:", file);
        currentFile = file;
    }
    let narrowedSchema = narrowedSchemas.get(event.event);
    if (narrowedSchema == null) {
        const definition = schema.definitions?.[event.event];
        if (definition != null) {
            narrowedSchema = {
                ...schema,
                $ref: `#/definitions/${event.event}`
            };
        } else {
            narrowedSchema = schema;
        }
        narrowedSchemas.set(event.event, narrowedSchema);
    }
    const result = validator.validate(event, narrowedSchema);
    if (result.errors.length > 0) {
        throw new ValidationError(result.errors[0].toString(), event);
    }
}
