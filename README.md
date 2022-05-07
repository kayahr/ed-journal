ed-journal
==========

[GitHub] | [NPM] | [API Doc]

TypeScript library to read/watch the Player Journal of [Frontier]'s game [Elite: Dangerous].

It provides a simple function to read and watch the journal. Just give it a directory and optionally tell it where to start and you receive a stream of events.

Interfaces are provided for all events so you can work with them type-safe and get completion help in your favorite TypeScript IDE.

Old events/properties which have been renamed in newer game versions are automatically converted to the new names so an application build for current game version can most likely also read the older journal files.

Getting started
---------------

Install the dependency:

```shell
$ npm install @kayahr/ed-journal
```

The following simple example shows how to use the [Journal] type to read all events from all journal files in chronological order and print the timestamp and event name and specially handle the `Music` event to print the music track.

```typescript
import { Journal } from "@kayahr/ed-journal";

const journal = new Journal();
for await (const event of journal) {
    console.log(event.timestamp, event.event);
    if (event.event === "Music") {
        // TypeScript automatically infers the event to be "Music"
        // so it knows its properties
        console.log(event.MusicTrack);
    }
});
```

Options
-------

You can pass an [JournalOptions] object to the [Journal] constructor with the following properties:

| Option      | Description
| ----------- | -------------------------------------------------------------------------------------------------------
| directory   | The journal directory to scan. Automatically determined if not specified (See *Journal directory location* section below)
| position    | The position within the journal to start reading it. Can be "start" (Default) or "end" or a [JournalPosition] object with properties `file`, `offset` and `line` to specify an exact position within the journal.
| watch       | Set to `true` to watch the journal directory for new events after reading the existing ones. When `false` (default) then only existing events are read and then reading ends.


Resume journal watching
-----------------------

If you want your application to remember the journal position on shutdown and continue from this position when application is started again you can read the current [JournalPosition] (consisting of `file`, `offset` and `line`) from the journal object, persist it in some way and pass it back to the constructor when starting the application again. Example:

```typescript
// Read previously persisted journal position
// (hardcoded in this example)
let position: JournalPosition = {
    file: "Journal.2022-06-07T181623.01.log",
    offset: 54133,
    line: 95
};

const journal = new Journal({ watch: true, position });
for await (const event of journal) {
    // Do something with the events.
    // At some point call `journal.close()` to stop watching and
    // exiting this loop
});

// Get current position from journal and persist it somewhere
position = journal.getPosition();
```


Journal directory location
--------------------------

The location of the journal directory is automatically determined by looking at the following locations:

* *$HOME/Saved Games/Frontier Developments/Elite Dangerous* (For Windows)
* *$HOME/.local/share/Steam/steamapps/compatdata/359320/pfx/drive_c/users/steamuser/Saved Games/Frontier Developments/Elite Dangerous* (For Steam Proton on Linux)
* *$ED_JOURNAL_DIR*

When the library does not find your journal directory then you can either use the `directory` constructor option to specify it manually or define the `$ED_JOURNAL_DIR` environment variable.

[Frontier]: https://www.frontier.co.uk/
[Elite: Dangerous]: https://www.elitedangerous.com/
[API Doc]: https://kayahr.github.io/ed-journal/
[GitHub]: https://github.com/kayahr/ed-journal
[NPM]: https://www.npmjs.com/package/@kayahr/ed-journal
[Journal]: https://kayahr.github.io/ed-journal/classes/Journal.html
[JournalOptions]: https://kayahr.github.io/ed-journal/interfaces/JournalOptions.html
[JournalPosition]: https://kayahr.github.io/ed-journal/interfaces/JournalPosition.html
