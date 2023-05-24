import { chain as _ } from "lodash-es";
import assert from 'node:assert';
import { KeyPaths, Lens, TypePrism } from "../lens";
import { Equals } from "../assert";

/**
 * First we define the data we are working on.
 */

type Person = {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
    zip: number;
    email: {
      value: string,
      valid: boolean;
    }
  };
};




/**
 * -------------
 * KeyPaths example for Person
 * -------------
 */

type PersonKeyPaths = KeyPaths<Person>;

type PersonPathAssertion = Equals<PersonKeyPaths, 
  | "name" 
  | "age" 
  | "address.street" 
  | "address.city" 
  | "address.zip" 
  | "address.valid"
>


/**
 * -------------
 * TypePrism example
 * -------------
 */

type PersonName = TypePrism<Person, "name">;
type PersonAge = TypePrism<Person, "age">;
type PersonAddress = TypePrism<Person, "address">;
type PersonEmail = TypePrism<Person, "address.email">;
type PersonAddressStreet = TypePrism<Person, "address.street">;
type PersonAddressCity = TypePrism<Person, "address.city">;
type PersonAddressZip = TypePrism<Person, "address.zip">;



/**
 * -------------
 * Lens example for Person
 * -------------
 */

/**
 * Create a lens for the person object.
 * 
 * We use lodash for our naive implementation.
 * We just clone the original object and set the new value to ensure immutability.
 */
const personLens: Lens<Person> = {
  set: (obj, path, value) => {
    return _(obj).cloneDeep().set(path, value).value();
  },
  get: (obj, path) => {
    return _(obj).get(path).value();
  }
};

/**
 * Example usage
 * First we create a person object
 */
const original = {
  name: "yornaath",
  age: 36,
  address: {
    street: "yoob",
    city: "yornaathsville",
    zip: 1337,
    email: {
      value: "jorn@zeitgeist",
      valid: false,
    }
  },
};

/**
 * Then we can use the lens to set a new value.
 * Lenses are funtion so should not mutate the passed object but return a new one.
 */
let updated = personLens.set(original, "address.zip", 12);
updated = personLens.set(updated, "address.email", {
  value: "jorn@zeitgeist.pm",
  valid: true,
});

/**
 * We can also use the lens to get a value.
 */
const originalZip = personLens.get(original, "address.zip");
const updatedZip = personLens.get(updated, "address.zip");

assert(
  originalZip !== updatedZip, 
  "Zip code should be updated"
);

console.log("original", original);
console.log("updated", updated);

/**
 * Doubble check that the original object is not mutated.
 */
assert(
  original !== updated, 
  "Original object should not be mutated"
);