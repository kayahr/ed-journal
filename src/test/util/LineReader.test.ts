import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";

import { LineReader } from "../../main/util/LineReader.ts";
import { assertNotNull, assertNull, assertSame } from "@kayahr/assert";

const textsDir = "src/test/data/texts";
const testTxt = join(textsDir, "test.txt");
const smallTxt = join(textsDir, "small.txt");

describe("LineReader", () => {
    it("iterates over the file line-by-line", async () => {
        const reader = await LineReader.create(testTxt);
        try {
            let text = "";
            for await (const line of reader) {
                assertSame(line.endsWith("\n"), true);
                text += line;
            }
            const origText = (await readFile(testTxt)).toString();
            assertSame(text, origText);
        } finally {
            await reader.close();
        }
    });
    it("can be used as async disposable", async () => {
        await using reader = await LineReader.create(testTxt);
        let text = "";
        for await (const line of reader) {
            assertSame(line.endsWith("\n"), true);
            text += line;
        }
        const origText = (await readFile(testTxt)).toString();
        assertSame(text, origText);
    });
    it("works with buffer size 1", async () => {
        const reader = await LineReader.create(smallTxt, 0, 1, 1);
        try {
            let text = "";
            for await (const line of reader) {
                assertSame(line.endsWith("\n"), true);
                text += line;
            }
            const origText = (await readFile(smallTxt)).toString();
            assertSame(text, origText);
        } finally {
            await reader.close();
        }
    });
    it("can start at arbitrary offsets", async () => {
        const reader = await LineReader.create(testTxt, 42997, 16);
        try {
            assertSame(await reader.next(), "End\n");
        } finally {
            await reader.close();
        }
    });
    describe("next", () => {
        it("reads next line of a file", async () => {
            const reader = await LineReader.create(testTxt);
            try {
                assertSame(await reader.next(), "a\n");
                assertSame(await reader.next(), "\n");
                assertSame(await reader.next(), "ab\n");
                assertSame(await reader.next(), "abc\n");
                let test = "Test text öäüßá";
                for (let i = 1; i < 12; i++) {
                    assertSame(await reader.next(), `${test}\n`);
                    test = `${test} ${test}`;
                }
                assertSame(await reader.next(), "End\n");
                assertNull(await reader.next());
            } finally {
                await reader.close();
            }
        });
        it("returns null whn file handle has already been closed", async () => {
            const reader = await LineReader.create(testTxt, 21493, 15);
            await reader.close();
            assertNull(await reader.next());
        });
    });
    describe("getLine", () => {
        it("returns the line number of the next line to read", async () => {
            const reader = await LineReader.create(testTxt);
            try {
                for (let i = 1; i < 17; i++) {
                    assertSame(reader.getLine(), i);
                    assertNotNull(await reader.next());
                }
                assertSame(reader.getLine(), 17);
                assertNull(await reader.next());
                assertSame(reader.getLine(), 17);
                assertNull(await reader.next());
            } finally {
                await reader.close();
            }
        });
    });
    describe("getOffset", () => {
        it("returns the byte offset of the next line to read", async () => {
            const encoder = new TextEncoder();
            const reader = await LineReader.create(testTxt);
            try {
                let offset = 0;
                assertSame(reader.getOffset(), offset);
                for await (const line of reader) {
                    const len = encoder.encode(line).length;
                    offset += len;
                    assertSame(reader.getOffset(), offset);
                }
            } finally {
                await reader.close();
            }
        });
    });
});
