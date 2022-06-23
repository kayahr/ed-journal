/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 *
 * This script validates the status (read from Status.json) against the JSON schema to find mismatches between
 * TypeScript interfaces and the actual written file contents.
 *
 * Usage: node lib/tools/validate-status
 */

import "source-map-support/register";

import { readFile } from "fs/promises";
import { Schema, Validator } from "jsonschema";
import { join } from "path";

import type { Status } from "../main/events/other/Status";
import { Journal } from "../main/Journal";
import type { JournalPosition } from "../main/JournalPosition";

let position: JournalPosition | string = process.argv[2] ?? "start";
if (position !== "start" && position !== "end") {
    position = { file: position, offset: 0, line: 1 };
}

class ValidationError extends Error {
    public constructor(message: string, event: Status) {
        super(`${message}:\n\n${JSON.stringify(event, undefined, 4)}`);
    }
}

(async () => {
    const validator = new Validator();
    const schema = JSON.parse((await readFile(join(__dirname, "..",
        "status.schema.json"))).toString()) as Schema;

    const journal = await Journal.open({ directory: "/tmp/test" });
    process.on("SIGINT", () => {
        void journal.close();
    });
    for await (const status of journal.watchStatus()) {
        const result = validator.validate(status, schema);
        if (result.errors.length > 0) {
            throw new ValidationError(result.errors[0].toString(), status);
        }
        console.log(status);
    }
})().catch(console.error);
