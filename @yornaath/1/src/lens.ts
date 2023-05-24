/**
 * A lens is a pair of functions that get and set a value at a given path in a nested object.
 */
export type Lens<T> = {
  set: <K extends KeyPaths<T>>(obj: T, path: K, value: TypePrism<T, K>) => T;
  get: <K extends KeyPaths<T>>(obj: T, path: K) => TypePrism<T, K>;
};

/**
  * Represents a union of all possible key paths within an object type.
  * A key path is a string that represents a path to a nested property in the object.
  * 
  * This type recursively traverses the keys in the object type T.
  * It constructs a union of the current key K and recursively calls itself on the nested type of key K.
  * If a key K points to a nested object, the key path is extended with dot notation.
 */
export type KeyPaths<T, K extends keyof T = keyof T> = K extends string | number
  ? K | `${K}${T[K] extends Record<any, any> ? `.${KeyPaths<T[K]> }` : ""}`
  : never;

export type TypePrism<
  T,
  P extends KeyPaths<T> = KeyPaths<T>
> = P extends `${infer K}.${infer R}`
  ? K extends keyof T ? R extends keyof T[K] ? R extends KeyPaths<T[K]>
      ? TypePrism<T[K], R>
      : never : never : never
  : P extends `${infer K}` ? K extends keyof T
    ? T[K]
    : never : never;


    