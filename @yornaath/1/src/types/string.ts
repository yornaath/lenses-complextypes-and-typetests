import { AssertTrue, Equals } from "./equals";

/**
 * Splits a string into a tuple of strings based on a given delimiter.
 *  -> If the string is empty, it returns an empty tuple.
 *  -> If the delimiter is empty, it returns a tuple of characters.
 *    -> Otherwise, recursively splits the string into a tuple of strings.
 */
export type Split<S extends string, D extends string> =
  S extends '' ? 
    [] :
  S extends `${infer T}${D}${infer U}` ? 
    [T, ...Split<U, D>] : 
  [S];


  

/**
 * --------------------------
 * TYPE TESTS
 * --------------------------
 */

type SplitAssert1 = AssertTrue<Equals<
  Split<"a.b.c", ".">, ["a", "b", "c"]>
>
type SplitAssert2 = AssertTrue<Equals<
  Split<"a.b.c", "">, ["a", ".", "b", ".", "c"]>
>
type SplitAssert3 = AssertTrue<Equals<
  Split<"a-b-c-d", "-">, ["a", "b", "c", "d"]>
>
type SplitAssert4 = AssertTrue<Equals<
  Split<"abcd", "">, ["a", "b", "c", "d"]>
>
type SplitAssert5 = AssertTrue<Equals<
  Split<"", ".">, []>
>