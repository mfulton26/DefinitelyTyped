// Type definitions for discontinuous-range 1.0
// Project: https://github.com/dtudury/discontinuous-range
// Definitions by:
// - Victor Zhou <https://github.com/OiCMudkips>
// - Mark Fulton <https://github.com/mfulton26>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * Represents a discontinuous range of numbers.
 */
declare class DiscontinuousRange {
    /**
     * Creates an empty discontinuous range.
     */
    constructor();

    /**
     * Creates a discontinuous range at start and ending at end.
     * @param number The start and end of the range to create.
     */
    constructor(number: number);

    /**
     * Creates a discontinuous range at start and ending at end.
     * @param start The start of the range to create.    
     * @param end   The end of the range to create.
     */
    constructor(start: number, end: number);

    /**
     * Creates a discontinuous range from an existing discontinuous range.
     * @param range The range from which to create a new range.
     */
    constructor(range: DiscontinuousRange);

    /**
     * Gets the length of the discontinuous range. This is the total count of numbers in the range.
     */
    length: number;

    /**
     * Adds the number to the current range.
     * @param number The number to add to the range.
     * @returns The range on which add was called. It contains the number.
     */
    add(number: number): DiscontinuousRange;

    /**
     * Adds the numbers from start to end to the current range.
     * @param start The first number to add to the range.
     * @param end   The last number to add to the range.
     * @returns The range on which add was called. It contains the numbers from start to end.
     */
    add(start: number, end: number): DiscontinuousRange;

    /**
     * Adds a range to the current range.
     * @param range The range to union with the current range.
     * @returns The range on which add was called. It contains the numbers in range.
     */
    add(range: DiscontinuousRange): DiscontinuousRange;

    /**
     * Removes the number from the current range.
     * @param number The number to remove from the range.
     * @returns The range on which subtract was called. It does not contain the number.
     */
    subtract(number: number): DiscontinuousRange;

    /**
     * Removes the numbers from start to end to the current range.
     * @param start The first number to remove from the range.
     * @param end   The last number to remove from the range.
     * @returns The range on which subtract was called. It does not contain the numbers from start to end.
     */
    subtract(start: number, end: number): DiscontinuousRange;

    /**
     * Removes range from the current range.
     * @param range The range to exclude from the current range.
     * @returns The range on which subtract was called. It does not contains the numbers in range.
     */
    subtract(range: DiscontinuousRange): DiscontinuousRange;

    /**
     * Returns the number in the discontinuous range at the specified index.
     * @param index The index to lookup a number.
     * @returns A number in the range. null if index is greater than the number of elements in the range.
     */
    index(index: number): number | null;

    /**
     * Returns a string representation of this discontinuous range in the format
     * "[ rangeOneLow-rangeOneHigh, ... , rangeNLow-rangeNHigh ]"
     * @returns A string representation of this discontinuous range.
     */
    toString(): string;

    /**
     * Returns a copy of this discontinuous range.
     * @returns A deep clone of the current discontinuous range.
     */
    clone(): DiscontinuousRange;
}

export = DiscontinuousRange;
