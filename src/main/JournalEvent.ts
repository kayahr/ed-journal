/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

type JournalEventUpdate<FROM extends JournalEvent = JournalEvent, TO extends JournalEvent = JournalEvent>
    = (from: FROM, to: TO) => void;

/** Registered journal event updates. */
const journalEventUpdates = new Map<string, JournalEventUpdate>();

/**
 * Registers a journal event update.
 *
 * @param event  - Tje event name.
 * @param update - The update function to register.
 */
export function registerJournalEventUpdate<From extends JournalEvent, To extends JournalEvent>(
        event: From["event"] & To["event"], update: (from: From, to: To) => void): void {
    journalEventUpdates.set(event, update as JournalEventUpdate);
}

/** Map from deprecated event names to new ones. */
const eventNameUpdates: Record<string, string> = {
    "ShipLockerMaterials": "ShipLocker",
    "BackPack": "Backpack",
    "BackPackMaterials": "Backpack"
};

/**
 * Updates the given journal event if necessary.
 *
 * @param event - The journal event to update.
 */
export function updateJournalEvent(event: JournalEvent): void {
    const newEventName = eventNameUpdates[event.event];
    if (newEventName != null) {
        event.event = newEventName;
    }
    journalEventUpdates.get(event.event)?.(event, event);
}

/**
 * Base interface shared by all journal event types.
 */
export interface JournalEvent<T extends string = string> {
    /** The time in GMT, ISO 8601. */
    timestamp: string;

    /** The type of event. */
    event: T;
}
