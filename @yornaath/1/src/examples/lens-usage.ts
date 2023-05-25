import assert from 'node:assert';
import { inspect } from 'node:util';
import { Lens, lens } from "../types/lens";

/**
 * First we define the data we are working on.
 * A simple profile object with nested address and email objects.
 */

export type Profile = {
  name: string;
  age?: number;
  address: {
    street: string;
    city: string;
    zip?: number;
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
 * First we create a Profile object
 */
export const initial: Profile = {
  name: "Killa",
  age: 42,
  address: {
    street: "Klimov Street",
    city: "Tarkov",
    email: {
      value: "killa@scavs..com",
      flags: {
        valid: false,
        confirmed: false,
      }
    }
  },
};

/**
 * -------------
 * Lens example for Profile
 * -------------
 */

/**
 * Create a lens for the Profile object.
 */
const profileL: Lens<Profile> = lens<Profile>()

/**
 * Then we can use the lens to set a new value.
 * Lenses are funtion so should not mutate the passed object but return a new one.
 */

let updated = profileL.set(initial, "address.zip", 12);

updated = profileL.set(updated, "address.email", {
  value: "killa@scavs.com",
  flags: {
    valid: true,
    confirmed: true,
  }
});

updated = profileL.set(updated, "address.email.flags.valid", true);

updated = profileL.set(updated, "address.zip", 1337);

/**
 * Age is optional so we can set it to undefined.
 */
updated = profileL.set(updated, "age", undefined);

/**
 * We can also get values from the object using the lens.
 */
const emailIsValid = profileL.get(updated, "address.email.flags.valid");

/**
 * Assert that the original object is not mutated by setting or getting values.
 */
assert(
  initial !== updated, 
  "Original object should not be mutated"
);


console.log("original", inspect(initial, true, 10, true));
console.log("updated", inspect(updated, true, 10, true));