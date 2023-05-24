
/**
 * This is a conditional type that checks if two types are equal.
 */
export type Equals<A, B> = A extends B ? true : false
