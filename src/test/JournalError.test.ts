import { describe, expect, it } from "vitest";

import { JournalError } from "../main/JournalError.js";

describe("JournalError", () => {
    it("has correct name", () => {
        const error = new JournalError("Foo");
        expect(error.name).toBe("JournalError");
    });
});
