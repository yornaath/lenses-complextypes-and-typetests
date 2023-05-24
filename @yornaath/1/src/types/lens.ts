import { chain as _ } from "lodash-es";
import type { InferredPathType, KeyPaths } from "./key-paths";

/**
 * A lens is a pair of functions that get and set a value at a given path in a nested object.
 */
export type Lens<T> = {
  set: <K extends KeyPaths<T>>(obj: T, path: K, value: InferredPathType<T, K>) => T;
  get: <K extends KeyPaths<T>>(obj: T, path: K) => InferredPathType<T, K>;
};

/**
 * Generic lens constructor for objects..
 * 
 * We use lodash for our naive implementation.
 * We just clone the original object and set the new value to ensure immutability.
 */
export const lens = <T extends object>(): Lens<T> => ({
  set: (obj, path, value) => {
    return _(obj).cloneDeep().set(path, value).value();
  },
  get: (obj, path) => {
    return _(obj).get(path).value();
  }
})

