import { describe, it } from "node:test";

import { getErrorMessage, toError } from "../../main/util/error.ts";
import { assertSame } from "@kayahr/assert";

describe("error", () => {
    describe("getErrorMessage", () => {
        it("returns message from Error", () => {
            assertSame(getErrorMessage(new Error("Pi is exactly 3!")), "Pi is exactly 3!");
        });
        it("returns parameter as string if not Error", () => {
            assertSame(getErrorMessage(1234), "1234");
        });
    });

    describe("toError", () => {
        it("returns argument when error", () => {
            const e = new Error("test");
            assertSame(toError(e), e);
        });
        it("returns error with argument as message if not error", () => {
            const error = toError(1234);
            assertSame(error.constructor, Error);
            assertSame(error.message, "1234");
        });
    });
});
