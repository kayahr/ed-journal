import { JournalError } from "../main/JournalError";

describe("JournalError", () => {
    it("has correct name", () => {
        const error = new JournalError("Foo");
        expect(error.name).toBe("JournalError");
    });
});
