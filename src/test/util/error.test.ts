import { getErrorMessage } from "../../main/util/error";

describe("error", () => {
    describe("getErrorMessage", () => {
        it("returns message from Error", () => {
            expect(getErrorMessage(new Error("Pi is exactly 3!"))).toBe("Pi is exactly 3!");
        });
        it("returns parameter as string if not Error", () => {
            expect(getErrorMessage(1234)).toBe("1234");
        });
    });
});
