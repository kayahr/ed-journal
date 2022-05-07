/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import * as fs from "fs";
import { promisify } from "util";

const open = promisify(fs.open);
const close = promisify(fs.close);
const read = promisify(fs.read);

/**
 * Concatenates given byte arrays and returns new byte array.
 *
 * @param a - First byte array.
 * @param b - Second byte array.
 * @return The concatenated byte array.
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
export class LineReader implements AsyncIterable<string> {
    /** The file to read from. */
    private readonly file: string;

    /** The read buffer. */
    private readonly buffer: Uint8Array;

    /** The file handle to read from. Null if file is not open. */
    private descriptor: number | null = null;

    /** The current read position in the file. */
    private readPosition: number;

    /** The current offset in the text stream. */
    private currentOffset: number;

    /** The current line in the text stream. */
    private currentLine: number;

    /** The current start index in the buffer. */
    private bufferStart: number = 0;

    /** The current end index in the buffer. */
    private bufferEnd: number = 0;

    /** The buffered line. */
    private bufferedLine: Uint8Array | null = null;

    /** Text decoder used to decode UTF-8 line into JavaScript string. */
    private readonly decoder = new TextDecoder();

    /**
     * Constructs a new line reader reading from the given file and position.
     *
     * @param file       - The file to read from.
     * @param offset     - The file offset to start reading from. Defaults to 0 (Beginning of file).
     * @param line       - The line number to start counting with. Defaults to 1 (First line).
     * @param bufferSize - The size of the read buffer in bytes. Defaults to 8 KB.
     */
    public constructor(file: string, offset: number = 0, line: number = 1, bufferSize = 8192) {
        this.file = file;
        this.readPosition = offset;
        this.currentOffset = offset;
        this.currentLine = line;
        this.buffer = new Uint8Array(bufferSize);
    }

    /**
     * Returns the byte offset from which the next line will be read.
     *
     * @return The byte offset from which the next line will be read.
     */
    public getOffset(): number {
        return this.currentOffset;
    }

    /**
     * Returns the line from which the next line will be read.
     *
     * @return The line from which the next line will be read.
     */
    public getLine(): number {
        return this.currentLine;
    }

    /**
     * Internally opens the file for reading if not already done and returns the file descriptor.
     *
     * @return The open file descriptor.
     */
    private async open(): Promise<number> {
        if (this.descriptor == null) {
            this.descriptor = await open(this.file, "r");
        }
        return this.descriptor;
    }

    /**
     * Closes the file if not already done. Note that the file will be re-opened when you call the [[readLine]]()
     * method.
     */
    public async close(): Promise<void> {
        if (this.descriptor != null) {
            await close(this.descriptor);
            this.descriptor = null;
        }
    }

    /**
     * Reads the next line from the file and returns it. A line must be terminated by a line break (LF or CRLF). Method
     * returns null if there is currently no complete line to return. You can call the method again to try again (In
     * case the file is still growing). The returned string includes the line terminated (LF or CRLF) so you have to
     * strip it yourself if necessary.
     *
     * @return The read line or null if no more complete lines are currently present.
     */
    public async next(): Promise<string | null> {
        // Fill buffer if empty
        if (this.bufferStart >= this.bufferEnd) {
            const descriptor = this.descriptor == null ? await this.open() : this.descriptor;
            const { bytesRead } = await read(descriptor, this.buffer, 0, this.buffer.length, this.readPosition);
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
        const newLineIndex = buffer.findIndex(value => value === 0x0a);

        if (newLineIndex >= 0) {
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
     * @return The read lines as a generator.
     */
    public async* [Symbol.asyncIterator](): AsyncGenerator<string> {
        let line: string | null;
        while ((line = await this.next()) != null) {
            yield line;
        }
    }
}
