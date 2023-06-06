import { Equals, Spec } from "./type-tests";


/**
 * Splits a string into a tuple of strings based on a given delimiter.
 *  -> If the string is empty, it returns an empty tuple.
 *  -> If the delimiter is empty, it returns a tuple of characters.
 *    -> Otherwise, recursively splits the string into a tuple of strings.
 */
export type Split<S extends string, D extends string> = 
  S extends "" ? 
    [] : 
  S extends `${infer T}${D}${infer U}` ? 
    [T, ...Split<U, D>] : 
  [S];


/**
 * Splits a string into a union of strings based on a given delimiter.
 */
export type SplitUnion<S extends string, D extends string> = 
  S extends "" ? 
    "" :
  S extends `${infer T}${D}${infer U}` ? 
    T | SplitUnion<U, D> : 
  S;


/**
 * --------------------------
 * TYPE TESTS
 * --------------------------
 */

type SplitTests = Spec<
  [
    Equals<Split<"", ".">, []>,
    Equals<Split<"a.b.c.d", ".">, ["a", "b", "c", "d"]>,
    Equals<Split<"a.b.c", "">, ["a", ".", "b", ".", "c"]>,
    Equals<Split<"a-b-c-d", "-">, ["a", "b", "c", "d"]>,
    Equals<Split<"abcd", "">, ["a", "b", "c", "d"]>,
    Equals<Split<"a", ".">, ["a"]>,
  ]
>;

type SplitUTests = Spec<
  [
    Equals<SplitUnion<"", ".">, "">,
    Equals<SplitUnion<"a.b.c", ".">, "a" | "b" | "c">,
    Equals<SplitUnion<"a-b-c-d", "-">, "a" | "b" | "c" | "d">,
    Equals<SplitUnion<"a", ".">, "a">,
  ]
>;
