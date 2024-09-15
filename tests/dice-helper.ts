import { d20 } from "../src";

export class DiceHelper {
  static sampleSize: number = 20;

  quantity: number;
  sides: number;
  min: number;
  max: number;
  rolls: number = 0;

  constructor(quantity: number, sides: number) {
    this.quantity = quantity;
    this.sides = sides;
  }

  static test(quantity: number, sides: number): DiceHelper {
    const result = new DiceHelper(quantity, sides);
    const minSample = [];
    const maxSample = [];

    for (let i = 0; i < DiceHelper.sampleSize; i++) {
      const rolls = d20.dice(`${quantity}d${sides}`);
      if (Array.isArray(rolls)) {
        result.rolls += rolls.length;
        minSample.push(Math.min(...rolls));
        maxSample.push(Math.max(...rolls));
      } else {
        let min = Infinity;
        let max = -Infinity;
        let count = 0;
        for (const roll of rolls) {
          min = Math.min(min, roll);
          max = Math.max(max, roll);
          count++;
        }
        result.rolls += count;
        minSample.push(min);
        maxSample.push(max);
      }
    }

    result.min = Math.min(...minSample);
    result.max = Math.max(...maxSample);

    return result;
  }
}
