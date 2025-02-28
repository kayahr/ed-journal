/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import type { Stats } from "node:fs";

import { type ChokidarOptions, watch as chokidarWatch } from "chokidar";

import { toError } from "./error.js";
import { Notifier } from "./Notifier.js";

/** Path-based watch event type. */
export interface WatchPathEvent {
    eventName: "add" | "change";
    path: string;
    stats?: Stats;
}

/** Event type triggered when watcher is ready. */
export interface WatchReadyEvent {
    eventName: "ready";
}

export type WatchEvent = WatchPathEvent | WatchReadyEvent;

/**
 * Watches the given paths for changes. This function uses event-based Chokidar in the background but
 * returns an async generator like the watch function from NodeJS. Hopefully one day NodeJS's watch function works
 * as good as Chokidar than Chokidar can be easily removed here.
 *
 * @param paths   - The path or paths to watch.
 * @param options - Watcher options. This combines Chokidar watch options and an abort signal option with which the
 *                  watcher can be aborted.
 * @return The async generator generating watch events.
 */
export async function *watch(paths: string | string[], options?: ChokidarOptions & { signal?: AbortSignal }):
        AsyncGenerator<WatchEvent> {
    const notifier = new Notifier();
    const events: WatchEvent[] = [];
    const watcher = chokidarWatch(paths, options);
    watcher.on("add", (path, stats) => {
        events.push({ eventName: "add", path, stats });
        notifier.notify();
    });
    watcher.on("change", (path, stats) => {
        events.push({ eventName: "change", path, stats });
        notifier.notify();
    });
    watcher.on("ready", () => {
        events.push({ eventName: "ready" });
        notifier.notify();
    });
    watcher.on("error", error => {
        notifier.abort(toError(error));
    });
    let aborted = false;
    const abort = async (): Promise<void> => {
        if (!aborted) {
            aborted = true;
            options?.signal?.removeEventListener("abort", abort);
            await watcher.close();
            notifier.notify();
        }
    };
    options?.signal?.addEventListener("abort", abort);
    try {
        while (!aborted) {
            const value = events.shift();
            if (value != null) {
                yield value;
            } else {
                await notifier.wait();
            }
        }
    } finally {
        await abort();
    }
}
