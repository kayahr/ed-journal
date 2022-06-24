ed-journal
==========

[GitHub] | [NPM] | [API Doc]

TypeScript library to read/watch the Player Journal of [Frontier]'s game [Elite: Dangerous].

Interfaces are provided for all events so you can work with them type-safe and get completion help in your favorite TypeScript IDE.

Old events/properties which have been renamed in newer game versions are automatically converted to the new names so an application build for current game version can most likely also read the older journal files.

Getting started
---------------

Install the dependency:

```shell
$ npm install @kayahr/ed-journal
```

The following simple example shows how to use the [Journal] class to read all events from all journal files in chronological order and print the timestamp and event name and specially handle the `Music` event to print the music track.

```typescript
import { Journal } from "@kayahr/ed-journal";

const journal = await Journal.open();
try {
    for await (const event of journal) {
        console.log(event.timestamp, event.event);
        if (event.event === "Music") {
            // TypeScript automatically infers the event to be "Music"
            // so it knows its properties
            console.log(event.MusicTrack);
        }
    });
} finally {
    await journal.close();
}
```

Options
-------

You can pass [JournalOptions] when opening a [Journal] with the following properties:

| Option      | Description
| ----------- | -------------------------------------------------------------------------------------------------------
| directory   | The journal directory to scan. Automatically determined if not specified (See *Journal directory location* section below)
| position    | The position within the journal to start reading it. Can be "start" (Default) or "end" or a [JournalPosition] object with properties `file`, `offset` and `line` to specify an exact position within the journal.
| watch       | Set to `true` to watch the journal directory for new events after reading the existing ones. When `false` (default) then only existing events are read and then reading ends.


Resume journal watching
-----------------------

If you want your application to remember the journal position on shutdown and continue from this position when application is started again you can read the current [JournalPosition] (consisting of `file`, `offset` and `line`) from the journal object, persist it in some way and use it again when starting the application again. Example:

```typescript
// Read previously persisted journal position
// (hardcoded in this example)
let position: JournalPosition = {
    file: "Journal.2022-06-07T181623.01.log",
    offset: 54133,
    line: 95
};

const journal = await Journal.open({ watch: true, position });
try {
    for await (const event of journal) {
        // Do something with the events.

        // At some point use `break` to stop watching
    }

    // Get current position from journal and persist it somewhere
    position = journal.getPosition();
} finally {
    await journal.close();
}
```

Separate journal JSON files
---------------------------

The game writes some additional JSON files containing only a single event which is overwritten regularly. The current event from these files can be read with the following methods on the journal instance:

* [readFCMaterials]
* [readMarket]
* [readModulesInfo]
* [readNavRoute]
* [readOutfitting]
* [readShipLocker]
* [readShipyard]
* [readStatus]

These methods return a single event object or `null` if the corresponding JSON file is not accessible (not yet present for example).

Example:

```typescript
const journal = await Journal.open();
try {
    const status = await journal.readStatus();
    console.log(status);
} finally {
    await journal.close();
}
```

You can also watch these files for changes which works pretty much the same way as watching the normal journal events by using the following methods on the journal instance:

* [watchFCMaterials]
* [watchMarket]
* [watchModulesInfo]
* [watchNavRoute]
* [watchOutfitting]
* [watchShipLocker]
* [watchShipyard]
* [watchStatus]

These methods return an async generator to iterate. The current event is always reported as first change when the file already exists.

Example:

```typescript
const journal = await Journal.open();
try {
    for await (const event of journal.watchStatus()) {
        // Do something with the events

        // At some point use `break` to stop watching
    }
} finally {
    await journal.close();
}
```

The generators automatically stop when journal is closed. So you might want to do the watching of various files in asynchronous background functions while your main application thread controls the journal. Example:

```typescript
async function watchStatus(journal: Journal): Promise<void> {
    for await (const event of journal.watchStatus()) {
        console.log(status);
    }
}

const journal = await Journal.open();
try {
    // Returned promise is resolved when watching ends after journal
    // is closed. But we don't need this promise, so voided here.
    void watchStatus(journal);

    // Run application here until it quits
    ...
} finally {
    await journal.close();
}
```

Journal directory location
--------------------------

The location of the journal directory is automatically determined by looking at the following locations:

* *$HOME/Saved Games/Frontier Developments/Elite Dangerous* (For Windows)
* *$HOME/.local/share/Steam/steamapps/compatdata/359320/pfx/drive_c/users/steamuser/Saved Games/Frontier Developments/Elite Dangerous* (For Steam Proton on Linux)
* *$ED_JOURNAL_DIR*

When the library does not find your journal directory then you can either use the `directory` option to specify it manually or define the `$ED_JOURNAL_DIR` environment variable.

[Frontier]: https://www.frontier.co.uk/
[Elite: Dangerous]: https://www.elitedangerous.com/
[API Doc]: https://kayahr.github.io/ed-journal/
[GitHub]: https://github.com/kayahr/ed-journal
[NPM]: https://www.npmjs.com/package/@kayahr/ed-journal
[Journal]: https://kayahr.github.io/ed-journal/classes/Journal.html
[JournalOptions]: https://kayahr.github.io/ed-journal/interfaces/JournalOptions.html
[JournalPosition]: https://kayahr.github.io/ed-journal/interfaces/JournalPosition.html
[readFCMaterials]: https://kayahr.github.io/ed-journal/classes/Journal.html#readFCMaterials
[watchFCMaterials]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchFCMaterials
[readMarket]: https://kayahr.github.io/ed-journal/classes/Journal.html#readMarket
[watchMarket]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchMarket
[readModulesInfo]: https://kayahr.github.io/ed-journal/classes/Journal.html#readModulesInfo
[watchModulesInfo]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchModulesInfo
[readNavRoute]: https://kayahr.github.io/ed-journal/classes/Journal.html#readNavRoute
[watchNavRoute]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchNavRoute
[readOutfitting]: https://kayahr.github.io/ed-journal/classes/Journal.html#readOutfitting
[watchOutfitting]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchOutfitting
[readShipLocker]: https://kayahr.github.io/ed-journal/classes/Journal.html#readShipLocker
[watchShipLocker]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchShipLocker
[readShipyard]: https://kayahr.github.io/ed-journal/classes/Journal.html#readShipyard
[watchShipyard]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchShipyard
[readStatus]: https://kayahr.github.io/ed-journal/classes/Journal.html#readStatus
[watchStatus]: https://kayahr.github.io/ed-journal/classes/Journal.html#watchStatus
