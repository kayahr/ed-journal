import { describe, it } from "node:test";

import { JournalError } from "../main/JournalError.ts";
import { assertSame } from "@kayahr/assert";

describe("JournalError", () => {
    it("has correct name", () => {
        const error = new JournalError("Foo");
        assertSame(error.name, "JournalError");
    });
});
