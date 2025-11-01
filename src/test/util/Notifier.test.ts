import { describe, it } from "node:test";

import { Notifier } from "../../main/util/Notifier.ts";
import { assertThrowWithMessage, assertUndefined } from "@kayahr/assert";

describe("Notifier", () => {
    describe("notify", () => {
        it("resolves the wait promise", async () => {
            const notifier = new Notifier();
            const promise = notifier.wait();
            notifier.notify();
            assertUndefined(await promise);
        });
    });

    describe("abort", () => {
        it("rejects the wait promise", async () => {
            const notifier = new Notifier();
            const promise = notifier.wait();
            const error = new Error("Foo");
            notifier.abort(error);
            await assertThrowWithMessage(() => promise, Error, "Foo");
        });
    });

    describe("wait", () => {
        it("throws error when notifier is already aborted", async () => {
            const notifier = new Notifier();
            const error = new Error("Foo");
            notifier.abort(error);
            const promise = notifier.wait();
            await assertThrowWithMessage(() => promise, Error, "Foo");
        });
    });
});
