/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { constants } from "fs";
import { access, lstat } from "fs/promises";

/**
 * Checks if given path is readable.
 *
 * @param path - The path to check.
 * @return True if path is readable, false if not.
 */
export async function isPathReadable(path: string): Promise<boolean> {
    try {
        await access(path, constants.R_OK);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Checks if given path is a directory.
 *
 * @param path - The path to check.
 * @return True if path is a directory, false if not.
 */
export async function isDirectory(path: string): Promise<boolean> {
    return (await lstat(path)).isDirectory();
}
