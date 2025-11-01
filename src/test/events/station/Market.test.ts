import { describe, it } from "node:test";

import { Journal } from "../../../main/Journal.ts";
import { assertSame } from "@kayahr/assert";

const directory = "src/test/data/events/Market";

describe("Market", () => {
    it("removes empty station type property", async () => {
        await using journal = await Journal.open({ directory, position: { file: "Journal.190119140426.01.log", offset: 0, line: 1 }
        });
        const event = await journal.next();
        assertSame(event?.event, "Market");
        if (event?.event === "Market") {
            assertSame(event.StationType, undefined);
        }
    });
});
