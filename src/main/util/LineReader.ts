/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { type FileHandle, open } from "node:fs/promises";

/**
 * Concatenates given byte arrays and returns new byte array.
 *
 * @param a - First byte array.
 * @param b - Second byte array.
 * @returns The concatenated byte array.
 */
function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
    const aSize = a.length;
    const result = new Uint8Array(aSize + b.length);
    result.set(a);
    result.set(b, aSize);
    return result;
}

/**
 * Reads lines from a UTF-8 encoded file.
 */
export class LineReader implements AsyncIterable<string>, AsyncDisposable {
    /** The read buffer. */
    private readonly buffer: Uint8Array;

    /** The file to read from. Null if file is not open. */
    private readonly file: FileHandle;

    /** The current read position in the file. */
    private readPosition: number;

    /** The current offset in the text stream. */
    private currentOffset: number;

    /** The current line in the text stream. */
    private currentLine: number;

    /** The current start index in the buffer. */
    private bufferStart = 0;

    /** The current end index in the buffer. */
    private bufferEnd = 0;

    /** The buffered line. */
    private bufferedLine: Uint8Array | null = null;

    /** Text decoder used to decode UTF-8 line into JavaScript string. */
    private readonly decoder = new TextDecoder();

    /**
     * Constructs a new line reader reading from the given file and position.
     *
     * @param file       - The file to read from.
     * @param offset     - The file offset to start reading from.
     * @param line       - The line number to start counting with.
     * @param bufferSize - The size of the read buffer in bytes.
     */
    private constructor(file: FileHandle, offset: number, line: number, bufferSize: number) {
        this.file = file;
        this.readPosition = offset;
        this.currentOffset = offset;
        this.currentLine = line;
        this.buffer = new Uint8Array(bufferSize);
    }

    /** @inheritdoc */
    public async [Symbol.asyncDispose](): Promise<void> {
        await this.close();
    }

    /**
     * Creates a new line reader reading from the given file and position.
     *
     * @param filename       - The file to read from.
     * @param offset     - The file offset to start reading from. Defaults to 0 (Beginning of file).
     * @param line       - The line number to start counting with. Defaults to 1 (First line).
     * @param bufferSize - The size of the read buffer in bytes. Defaults to 8 KB.
     * @returns The created line reader.
     */
    public static async create(filename: string, offset = 0, line = 1, bufferSize = 8192): Promise<LineReader> {
        const file = await open(filename, "r");
        return new LineReader(file, offset, line, bufferSize);
    }

    /**
     * Returns the byte offset from which the next line will be read.
     *
     * @returns The byte offset from which the next line will be read.
     */
    public getOffset(): number {
        return this.currentOffset;
    }

    /**
     * Returns the line from which the next line will be read.
     *
     * @returns The line from which the next line will be read.
     */
    public getLine(): number {
        return this.currentLine;
    }

    /**
     * Closes the file reader and releases the file handle it uses.
     */
    public async close(): Promise<void> {
        await this.file.close();
    }

    /**
     * Reads the next line from the file and returns it. A line must be terminated by a line break (LF or CRLF). Method
     * returns null if there is currently no complete line to return. You can call the method again to try again (In
     * case the file is still growing). The returned string includes the line terminated (LF or CRLF) so you have to
     * strip it yourself if necessary.
     *
     * @returns The read line or null if no more complete lines are currently present.
     */
    public async next(): Promise<string | null> {
        // Fill buffer if empty
        if (this.bufferStart >= this.bufferEnd) {
            if (this.file.fd === -1) {
                // Check if file handle has already been closed
                return null;
            }
            const { bytesRead } = await this.file.read({ buffer: this.buffer, position: this.readPosition });
            if (bytesRead > 0) {
                this.bufferStart = 0;
                this.bufferEnd = bytesRead;
                this.readPosition += bytesRead;
                return this.next();
            } else {
                return null;
            }
        }

        // Get text data in buffer
        const buffer = this.buffer.subarray(this.bufferStart, this.bufferEnd);

        // Search for line break in text
        const newLineIndex = buffer.indexOf(0x0a);

        if (newLineIndex !== -1) {
            // When line break was found then construct line and return it and prepare state for next line
            const subBuffer = buffer.subarray(0, newLineIndex + 1);
            const bytes = this.bufferedLine != null ? concat(this.bufferedLine, subBuffer) : subBuffer;
            const text = this.decoder.decode(bytes);
            this.currentOffset += bytes.length;
            this.currentLine += 1;
            this.bufferStart += newLineIndex + 1;
            this.bufferedLine = null;
            return text;
        } else {
            // When no line break was found then buffer the current incomplete line, read the next block and try again
            this.bufferedLine = this.bufferedLine != null ? concat(this.bufferedLine, buffer) : buffer.slice();
            this.bufferStart = this.bufferEnd;
            return this.next();
        }
    }

    /**
     * Reads all lines until the end of the file.
     *
     * @yields The read lines as a generator.
     */
    public async *[Symbol.asyncIterator](): AsyncGenerator<string> {
        let line: string | null;
        while ((line = await this.next()) != null) {
            yield line;
        }
    }
}
