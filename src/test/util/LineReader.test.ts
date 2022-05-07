import * as fs from "fs";
import * as path from "path";

import { LineReader } from "../../main/util/LineReader";

const textsDir = path.join(__dirname, "../../../src/test/data/texts");
const testTxt = path.join(textsDir, "test.txt");

describe("LineReader", () => {
    it("iterates over the file line-by-line", async () => {
        const reader = new LineReader(testTxt);
        try {
            let text = "";
            for await (const line of reader) {
                expect(line.endsWith("\n")).toBe(true);
                text += line;
            }
            const origText = fs.readFileSync(testTxt).toString();
            expect(text).toBe(origText);
        } catch (e) {
            await reader.close();
        }
    });
    it("works with buffer size 1", async () => {
        const reader = new LineReader(testTxt, 0, 1, 1);
        try {
            let text = "";
            for await (const line of reader) {
                expect(line.endsWith("\n")).toBe(true);
                text += line;
            }
            const origText = fs.readFileSync(testTxt).toString();
            expect(text).toBe(origText);
        } catch (e) {
            await reader.close();
        }
    });
    it("can start at arbitrary offsets", async () => {
        const reader = new LineReader(testTxt, 42997, 16);
        try {
            expect(await reader.next()).toBe("End\n");
        } catch (e) {
            await reader.close();
        }
    });
    describe("next", () => {
        it("reads next line of a file", async () => {
            const reader = new LineReader(testTxt);
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
    });
    describe("getLine", () => {
        it("returns the line number of the next line to read", async () => {
            const reader = new LineReader(testTxt);
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
            const reader = new LineReader(testTxt);
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