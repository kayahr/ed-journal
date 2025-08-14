/*
 * Copyright (C) 2025 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

/**
 * ID numbers in Elite Dangerous may be very large, exceeding the 53 bit range of JavaScript number type. So IDs are treated like both, number and bigint.
 * The JSON parser automatically creates bigint values for ID properties when the value exceeds the safe integer range.
 *
 * @asType integer
 */
export type ID = number | bigint;
