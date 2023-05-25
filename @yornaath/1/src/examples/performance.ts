import { isEqual } from "lodash-es";
import { Lens, immerLens, lens } from "../types/lens";
import type { Profile } from "./lens-usage";

type LargeProfile = Profile & {
  some: {
    deep: {
      array: number[]
    }
  }
}

/**
 * Create a lens for the Profile object.
 */
const profileL: Lens<LargeProfile> = lens<LargeProfile>()
const immerProfileL: Lens<LargeProfile> = immerLens<LargeProfile>()

/**
 * Then we can use the lens to set a new value.
 * Lenses are funtion so should not mutate the passed object but return a new one.
 */

const iterations = 9000

const initial: LargeProfile = {
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
  some: {
    deep: {
      array: Array.from({length: 1000}).map((_, index) => index)
    }
  }
};

const firstNaive = initial
const firstImmer = initial
let lastNaive = initial
let lastImmer = initial

console.time("naive");
for(let i = 0; i < iterations; i++) {
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
  updated = profileL.set(updated, "age", undefined);

  profileL.get(updated, "address.email.flags.valid");
  profileL.get(updated, "address.zip");
  profileL.get(updated, "age");
  lastNaive = updated
}
console.timeEnd("naive");

console.time("immer");
for(let i = 0; i < iterations; i++) {
  let updated = immerProfileL.set(initial, "address.zip", 12);
  updated = immerProfileL.set(updated, "address.email", {
    value: "killa@scavs.com",
    flags: {
      valid: true,
      confirmed: true,
    }
  });
  updated = immerProfileL.set(updated, "address.email.flags.valid", true);
  updated = immerProfileL.set(updated, "address.zip", 1337);
  updated = immerProfileL.set(updated, "age", undefined);

  immerProfileL.get(updated, "address.email.flags.valid");
  immerProfileL.get(updated, "address.zip");
  immerProfileL.get(updated, "age");
  lastImmer = updated
}
console.timeEnd("immer");

console.log('Both implementation produce same state?', isEqual(lastNaive, lastImmer))
console.log('Naive reference equality on untouched property?', lastNaive.some === firstNaive.some)
console.log('Immer reference equality on untouched property?', lastImmer.some === firstImmer.some)