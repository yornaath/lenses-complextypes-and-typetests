
/**
 * Helper to assert that all type checks in a type array are true.
 */
export type Spec<A extends true[]> = A

/**
 * This is a conditional type that checks if a type is true.
 * Usefull for testing as it will show a type assertion error if the type passed is not true.
 * Used in conjunction with the Equals type.
 */
export type AssertTrue<A extends true> = A

/**
 * This is a conditional type that checks if two types are equal.
 */
export type Equals<A, B> = A extends B ? true : false

