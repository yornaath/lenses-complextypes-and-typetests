import type { AssertTrue, Equals } from "./equals"
import type { Split } from "./string"

/**
  * Represents a union of all possible key paths within an object type.
  * A key path is a string that represents a path to a nested property in the object.
  * 
  * This type recursively traverses the keys in the object type T.
  *   -> It constructs a union of the current key K and recursively calls itself on the nested type of key K.
  *   -> If a key K points to a nested object, the key path is extended with dot notation.
 */
export type KeyPaths<T, K extends keyof T = keyof T> = 
  string & 
  (
    K extends string | number ? 
      K | `${K}${T[K] extends Record<any, any> ? `.${KeyPaths<T[K]> }` : ""}`
    : never
  )

/**
 * Extracts a specific nested type from an object based on a given key path.
 * The key path represents a string that points to the desired nested property within the object.
 * 
 * This type traverses the object and recursively matches the key path to retrieve the nested type.
 * It ensures type safety by checking the validity of each key in the path.
 * If the key path is valid, it returns the corresponding nested type; otherwise, it evaluates to the 'never' type.
 */
export type InferredPathType<
  T,
  P extends KeyPaths<T>,
  K = Split<P, ".">
> = 
  K extends [infer Head, ...infer Tail] ?
    Head extends keyof T ? 
      InferredPathType<T[Head], KeyPaths<T[Head]>, Tail>
    : never
  : T




/**
 * --------------------------
 * TYPE TESTS
 * --------------------------
 */

type TestType = { 
  root: string,
  foo: {
    bar: number, 
    baz: {
      exhausted: {
        reached: true, 
        optional?: "Option"
      }
    }
  } 
}

type KeyPathsAssert = AssertTrue<Equals<KeyPaths<TestType>, 
  | "root" 
  | "foo" 
  | "foo.bar" 
  | "foo.baz" 
  | "foo.baz.exhausted" 
  | "foo.baz.exhausted.reached"
  | "foo.baz.exhausted.optional"
>>


type InferredPathTypeAssert1 = AssertTrue<Equals<
  InferredPathType<TestType, "root">, string>
>
type InferredPathTypeAssert2 = AssertTrue<Equals<
  InferredPathType<TestType, "foo">, {bar: number, baz: {exhausted: {reached: true}}}>
>
type InferredPathTypeAssert3 = AssertTrue<Equals<
  InferredPathType<TestType, "foo.bar">, number>
>
type InferredPathTypeAssert4 = AssertTrue<Equals<
  InferredPathType<TestType, "foo.baz">, {exhausted: {reached: true}}>
>
type InferredPathTypeAssert5 = AssertTrue<Equals<
  InferredPathType<TestType, "foo.baz.exhausted">, {reached: true}>
>
type InferredPathTypeAssert6 = AssertTrue<Equals<
  InferredPathType<TestType, "foo.baz.exhausted.reached">, true>
>
type InferredPathTypeAssert7 = AssertTrue<Equals<
  InferredPathType<TestType, "foo.baz.exhausted.optional">, "Option" | undefined>
>