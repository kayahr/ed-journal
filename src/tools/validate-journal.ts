// import "source-map-support/register";

// import * as fs from "fs";
// import { Schema, Validator } from "jsonschema";
// import * as path from "path";

// import type { AnyJournalEvent } from "../main/AnyJournalEvent";
// import { readJournal } from "../main/journal";

// const startFile = process.argv[2];
// const startOffset = +process.argv[3] | 0;
// const startLine = +process.argv[4] | 1;

// const validator = new Validator();
// const schema = JSON.parse(fs.readFileSync(path.join(__dirname, "..",
//     "journal-event.schema.json")).toString()) as Schema;
// const narrowedSchemas = new Map<string, Schema>();

// class ValidationError extends Error {
//     public constructor(message: string, event: AnyJournalEvent) {
//         super(`${message}:\n\n${JSON.stringify(event, undefined, 4)}`);
//     }
// }

// let currentFile = "";
// const subscription = readJournal({ startFile, startOffset, startLine }).subscribe({
//     next: data => {
//         if (data.file !== currentFile) {
//             currentFile = data.file;
//             console.log("Validating " + currentFile);
//         }
//         const event = data.event;
//         let narrowedSchema = narrowedSchemas.get(event.event);
//         if (narrowedSchema == null) {
//             const definition = schema.definitions?.[event.event];
//             if (definition != null) {
//                 narrowedSchema = { ...schema, ...definition };
//                 delete narrowedSchema.anyOf;
//             } else {
//                 narrowedSchema = schema;
//             }
//             narrowedSchemas.set(event.event, narrowedSchema);
//         }
//         const result = validator.validate(event, narrowedSchema);
//         if (result.errors.length > 0) {
//             throw new ValidationError(result.errors[0].toString(), event);
//         }
//     },
//     error: error => console.error(error)
// });

// process.on("SIGINT", () => {
//     subscription.unsubscribe();
// });
