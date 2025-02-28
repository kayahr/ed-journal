/*
 * Copyright (C) 2022 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/**
 * Returns the error message for the given error. When error is of type Error then the message property is read.
 * Otherwise the error is simply converted to a string.
 *
 * @param error - The error.
 * @returns The error message.
 */
export function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

/**
 * Converts the given error object into an instance of the Error class. If it is already is an instance then it is returned unchanged. Otherwise it
 * is converted into a string and a new Error object is created using this string as error message.
 *
 * @param error - The error if unknown type.
 * @returns An Error instance.
 */

export function toError(error: unknown): Error {
    return error instanceof Error ? error : new Error(String(error));
}
