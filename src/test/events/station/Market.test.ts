import { describe, expect, it } from "vitest";

import { Journal } from "../../../main/Journal.js";

const directory = "src/test/data/events/Market";

describe("Market", () => {
    it("removes empty station type property", async () => {
        await using journal = await Journal.open({ directory, position: { file: "Journal.190119140426.01.log", offset: 0, line: 1 }
        });
        const event = await journal.next();
        expect(event?.event).toBe("Market");
        if (event?.event === "Market") {
            expect(event.StationType).toBe(undefined);
        }
    });
});
