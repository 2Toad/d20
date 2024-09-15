import { Dice } from "./dice";
import { DiceNotation } from "./types";
import { murmurHash3, sfc32 } from "./libs/random";

export const LARGE_DICE_QUANTITY = 1000000;

const diceCache = new Map<DiceNotation, Dice>();
function getDice(notation: DiceNotation): Dice {
  let dice = diceCache.get(notation);
  if (!dice) {
    dice = new Dice(notation);
    diceCache.set(notation, dice);
  }
  return dice;
}

/**
 * Create a random number generator from a seed.
 * @param seed - The seed for the random number generator.
 * @returns A function that generates random numbers.
 */
function createSeededRandom(seed: string) {
  const a = murmurHash3(seed + "1") >>> 0;
  const b = murmurHash3(seed + "2") >>> 0;
  const c = murmurHash3(seed + "3") >>> 0;
  const d = murmurHash3(seed + "4") >>> 0;
  return sfc32(a, b, c, d);
}

function getRandomInt(max: number, randomFunc = Math.random): number {
  return Math.floor(randomFunc() * max) + 1;
}

export const dice = (notation: DiceNotation, seed?: string): number[] | IterableIterator<number> => {
  const d = getDice(notation);
  const randomFunc = seed !== undefined ? createSeededRandom(seed) : Math.random;

  // For non-large (more feasibly-sized) quantities, use an array
  if (d.quantity < LARGE_DICE_QUANTITY) {
    return Array.from({ length: d.quantity }, () => getRandomInt(d.sides, randomFunc));
  }

  // For large quantities, return a generator instead of an array to prevent memory issues
  return (function* () {
    for (let i = 0; i < d.quantity; i++) {
      yield getRandomInt(d.sides, randomFunc);
    }
  })();
};

export const roll = (notation: DiceNotation, seed?: string): number => {
  const result = dice(notation, seed);

  // Array
  if (Array.isArray(result)) {
    return result.reduce((sum, value) => sum + value, 0);
  }

  // Generator
  let sum = 0;
  for (const value of result) {
    sum += value;
  }
  return sum;
};

export const d20 = {
  dice,
  roll,
};
