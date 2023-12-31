import { readFile } from "fs/promises";
import { join } from "path";

import { LineReader } from "../../main/util/LineReader";

const textsDir = "src/test/data/texts";
const testTxt = join(textsDir, "test.txt");
const smallTxt = join(textsDir, "small.txt");

describe("LineReader", () => {
    it("iterates over the file line-by-line", async () => {
        const reader = await LineReader.create(testTxt);
        try {
            let text = "";
            for await (const line of reader) {
                expect(line.endsWith("\n")).toBe(true);
                text += line;
            }
            const origText = (await readFile(testTxt)).toString();
            expect(text).toBe(origText);
        } finally {
            await reader.close();
        }
    });
    it("works with buffer size 1", async () => {
        const reader = await LineReader.create(smallTxt, 0, 1, 1);
        try {
            let text = "";
            for await (const line of reader) {
                expect(line.endsWith("\n")).toBe(true);
                text += line;
            }
            const origText = (await readFile(smallTxt)).toString();
            expect(text).toBe(origText);
        } finally {
            await reader.close();
        }
    });
    it("can start at arbitrary offsets", async () => {
        const reader = await LineReader.create(testTxt, 42997, 16);
        try {
            expect(await reader.next()).toBe("End\n");
        } finally {
            await reader.close();
        }
    });
    describe("next", () => {
        it("reads next line of a file", async () => {
            const reader = await LineReader.create(testTxt);
            try {
                expect(await reader.next()).toBe("a\n");
                expect(await reader.next()).toBe("\n");
                expect(await reader.next()).toBe("ab\n");
                expect(await reader.next()).toBe("abc\n");
                let test = "Test text öäüßá";
                for (let i = 1; i < 12; i++) {
                    expect(await reader.next()).toBe(`${test}\n`);
                    test = `${test} ${test}`;
                }
                expect(await reader.next()).toBe("End\n");
                expect(await reader.next()).toBeNull();
            } finally {
                await reader.close();
            }
        });
        it("returns null whn file handle has already been closed", async () => {
            const reader = await LineReader.create(testTxt, 21493, 15);
            await reader.close();
            expect(await reader.next()).toBeNull();
        });
    });
    describe("getLine", () => {
        it("returns the line number of the next line to read", async () => {
            const reader = await LineReader.create(testTxt);
            try {
                for (let i = 1; i < 17; i++) {
                    expect(reader.getLine()).toBe(i);
                    expect(await reader.next()).not.toBeNull();
                }
                expect(reader.getLine()).toBe(17);
                expect(await reader.next()).toBeNull();
                expect(reader.getLine()).toBe(17);
                expect(await reader.next()).toBeNull();
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
                expect(reader.getOffset()).toBe(offset);
                for await (const line of reader) {
                    const len = encoder.encode(line).length;
                    offset += len;
                    expect(reader.getOffset()).toBe(offset);
                }
            } finally {
                await reader.close();
            }
        });
    });
});
