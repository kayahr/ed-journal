import { describe, expect, it } from "vitest";

import { getErrorMessage, toError } from "../../main/util/error.js";

describe("error", () => {
    describe("getErrorMessage", () => {
        it("returns message from Error", () => {
            expect(getErrorMessage(new Error("Pi is exactly 3!"))).toBe("Pi is exactly 3!");
        });
        it("returns parameter as string if not Error", () => {
            expect(getErrorMessage(1234)).toBe("1234");
        });
    });

    describe("toError", () => {
        it("returns argument when error", () => {
            const e = new Error("test");
            expect(toError(e)).toBe(e);
        });
        it("returns error with argument as message if not error", () => {
            expect(toError(1234)).toEqual(new Error("1234"));
        });
    });
});
