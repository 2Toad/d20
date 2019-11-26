import { d20 } from '../src';

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
      result.rolls += rolls.length;
      minSample.push(Math.min(...rolls));
      maxSample.push(Math.max(...rolls));
    }

    result.min = Math.min(...minSample);
    result.max = Math.max(...maxSample);

    return result;
  }
}
