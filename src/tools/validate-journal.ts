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

import { Ajv, type Schema, type ValidateFunction } from "ajv";
import { readFile } from "fs/promises";
import { JSONStringify } from "json-with-bigint";
import { join } from "path";

import type { AnyJournalEvent } from "../main/AnyJournalEvent.js";
import { Journal } from "../main/Journal.js";
import type { JournalPosition, NamedJournalPosition } from "../main/JournalPosition.js";

const arg = process.argv[2] ?? "start";
let position: JournalPosition | NamedJournalPosition;
if (arg.endsWith(".log")) {
    position = { file: arg, offset: 0, line: 1 };
} else {
    position = arg as NamedJournalPosition;
}

class ValidationError extends Error {
    public constructor(message: string, event: AnyJournalEvent) {
        super(`${message}\n\n${JSONStringify(event, undefined, 4)}`);
    }
}

const ajv = new Ajv({ strict: true, allowUnionTypes: true });
const schema = JSON.parse((await readFile(join("lib", "journal-event.schema.json"))).toString()) as { definitions: Record<string, unknown> };
const validators = new Map<string, ValidateFunction>();

function bigintToNumber(obj: unknown): void {
    if (obj != null && typeof obj === "object") {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                const value = obj[i] as unknown;
                if (typeof value === "bigint") {
                    obj[i] = Number(value);
                } else if (typeof value === "object") {
                    bigintToNumber(value);
                }
            }
        } else {
            for (const [ key, value ] of Object.entries(obj)) {
                if (typeof value === "bigint") {
                    (obj as Record<string, number>)[key] = Number(value);
                } else if (typeof value === "object") {
                    bigintToNumber(value);
                }
            }
        }
    }
}

const journal = await Journal.open({ position, watch: false });
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
    let validator = validators.get(event.event);
    if (validator == null) {
        const definition = schema.definitions?.[event.event];
        let narrowedSchema: Schema;
        if (definition != null) {
            narrowedSchema = {
                ...schema,
                $ref: `#/definitions/${event.event}`
            };
        } else {
            narrowedSchema = schema;
        }
        validator = ajv.compile(narrowedSchema);
        validators.set(event.event, validator);
    }
    // if (event.event === "Scan" && event.StarType != null && event.AbsoluteMagnitude > 0) {
    //     console.log(event);
    //     break;
    // }
    // AJV cannot validate bigint against integer json type. So we have to convert bigint to number first
    bigintToNumber(event);
    const result = validator(event);
    if (!result) {
        throw new ValidationError(ajv.errorsText(validator.errors, { dataVar: "event" }), event);
    }
}
