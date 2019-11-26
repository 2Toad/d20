import { d20 } from '../src';

export class RollHelper {
  static sampleSize: number = 20;

  quantity: number;
  sides: number;
  min: number;
  max: number;

  get possible(): number {
    return this.quantity * this.sides;
  }

  constructor(quantity: number, sides: number) {
    this.quantity = quantity;
    this.sides = sides;
  }

  static test(quantity: number, sides: number): RollHelper {
    const result = new RollHelper(quantity, sides);
    const samples = [];

    for (let i = 0; i < RollHelper.sampleSize; i++) {
      const roll = d20.roll(`${quantity}d${sides}`);
      samples.push(roll);
    }

    result.min = Math.min(...samples);
    result.max = Math.max(...samples);

    return result;
  }
}
