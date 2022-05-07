/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/**
 * Returns the error message for the given error. When error is of type Error then the message property is read.
 * Otherwise the error is simply converted to a string.
 *
 * @param error - The error.
 * @return The error message.
 */
export function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "" + error;
}
