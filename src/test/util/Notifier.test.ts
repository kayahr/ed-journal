import { describe, expect, it } from "vitest";

import { Notifier } from "../../main/util/Notifier.js";

describe("Notifier", () => {
    describe("notify", () => {
        it("resolves the wait promise", () => {
            const notifier = new Notifier();
            const promise = notifier.wait();
            notifier.notify();
            return expect(promise).resolves.toBe(undefined);
        });
    });

    describe("abort", () => {
        it("rejects the wait promise", () => {
            const notifier = new Notifier();
            const promise = notifier.wait();
            const error = new Error("Foo");
            notifier.abort(error);
            return expect(promise).rejects.toBe(error);
        });
    });

    describe("wait", () => {
        it("throws error when notifier is already aborted", () => {
            const notifier = new Notifier();
            const error = new Error("Foo");
            notifier.abort(error);
            const promise = notifier.wait();
            return expect(promise).rejects.toBe(error);
        });
    });
});
