/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/**
 * Allows async process to be notified by another process.
 */
export class Notifier {
    private error: Error | null = null;
    private promise: Promise<void> | null = null;
    private resolve: (() => void) | null = null;
    private reject: ((e: Error) => void) | null = null;

    /**
     * Notifies waiting processes. This resolves the promise returned by {@link wait} method.
     */
    public notify(): void {
        if (this.resolve != null) {
            this.resolve();
            this.reset();
        }
    }

    /**
     * Aborts the notifier. This rejects the promise returned by the {@link wait} method.
     *
     * @param error - The error with which to abort the notifier.
     */
    public abort(error: Error): void {
        this.error = error;
        if (this.reject != null) {
            this.reject(error);
            this.reset();
        }
    }

    private reset(): void {
        this.resolve = null;
        this.reject = null;
        this.promise = null;
    }

    /**
     * Waits until some other process calls the {@link notify} or {@link abort} method.
     *
     * @return Promise resolved with {@link notify} was called or rejected when {@link abort} has been called.
     */
    public async wait(): Promise<void> {
        if (this.error != null) {
            throw this.error;
        }
        if (this.promise == null) {
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }
        return this.promise;
    }
}
