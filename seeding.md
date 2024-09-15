# Seeding

The d20 library provides a seed option for both the `roll()` and `dice()` functions. This feature allows you to generate reproducible random results.

## Use Cases

- **Game Development**:
   - Create deterministic game worlds or dungeons based on a seed.
   - Implement "daily challenges" where all players get the same random sequence.

- **Procedural Generation**:
   - Generate consistent terrain, maps, or levels across different runs.
   - Create shareable content where users can input a seed to get the same result.

- **Simulations**:
   - Run repeatable scientific or statistical simulations.
   - Compare different algorithms or strategies using the same random sequence.

- **Education**:
   - Create reproducible examples for teaching probability or game theory.
   - Allow students to share specific random scenarios with instructors for help.

- **Multiplayer Games**:
   - Ensure fairness in online games by using a shared seed for random events.
   - Implement replay systems where game events can be perfectly recreated.

- **Content Creation**:
   - Generate consistent random names, characters, or storylines for creative writing.
   - Create reproducible random art or music compositions.

By leveraging the seed option, developers can maintain control over randomness -- I know, it sounds counterintuitive 🧌

## How it works

1. When you provide a seed, the library uses a seeded random number generator.
2. The seed can be any string.
3. The same seed will always produce the same sequence of random numbers, ensuring consistent results across different runs or machines.

### Implementation

The seed functionality is implemented using the following algorithms:

- [MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash): a fast hash function used to convert the seed string into numerical values.
   - Designed for high performance and low collision rates
   - Produces a 32-bit hash value
   - Non-cryptographic, optimized for speed over security
   - Exhibits excellent distribution properties for varied input types

- [SFC32](https://en.wikipedia.org/wiki/Pseudorandom_number_generator): a 128-bit pseudorandom number generator that uses the hash values to generate a sequence of random numbers.
   - Part of the "Small Fast Chaotic" PRNG family
   - Passes statistical randomness tests like BigCrush
   - Has a period of 2^128 - 1, ensuring long sequences before repetition
   - Requires only 16 bytes of state, making it memory-efficient

These algorithms work together to provide a deterministic and reproducible random number generation process based on the provided seed.
