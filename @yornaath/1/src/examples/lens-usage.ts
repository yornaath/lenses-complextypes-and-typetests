import { chain as _ } from "lodash-es";
import assert from 'node:assert';
import { inspect } from 'node:util';
import type { Equals } from "../types/equals";
import type { InferredPathType, KeyPaths } from "../types/key-paths";
import { Lens, lens } from "../types/lens";

/**
 * First we define the data we are working on.
 */

type Person = {
  name: string;
  age?: number;
  address: {
    street: string;
    city: string;
    zip: number;
    email: {
      value: string,
      flags: {
        valid: boolean;
        confirmed: boolean;
      }
    }
  };
};


/**
 * Example usage
 * First we create a person object
 */
const initial: Person = {
  name: "yornaath",
  age: 36,
  address: {
    street: "yoob",
    city: "yornaathsville",
    zip: 1337,
    email: {
      value: "jorn@zeitgeist",
      flags: {
        valid: false,
        confirmed: false,
      }
      
    }
  },
};

/**
 * -------------
 * Lens example for Person
 * -------------
 */

/**
 * Create a lens for the person object.
 */
const personL: Lens<Person> = lens<Person>()

/**
 * Then we can use the lens to set a new value.
 * Lenses are funtion so should not mutate the passed object but return a new one.
 */

let updated = personL.set(initial, "address.zip", 12);

updated = personL.set(updated, "address.email", {
  value: "jorn@zeitgeist.pm",
  flags: {
    valid: true,
    confirmed: true,
  }
});

updated = personL.set(updated, "address.email.flags.valid", true);

updated = personL.set(updated, "address.zip", 7777);

/**
 * Age is optional so we can set it to undefined.
 */
updated = personL.set(updated, "age", undefined);

/**
 * Assert that the original object is not mutated by setting or getting values.
 */
assert(
  initial !== updated, 
  "Original object should not be mutated"
);


console.log("original", inspect(initial, true, 10, true));
console.log("updated", inspect(updated, true, 10, true));