import { Dice } from './dice';

export class D20 {
  roll(notation: string): number {
    const rolls = this.dice(notation);
    return this.total(rolls);
  }

  dice(notation: string): number[] {
    const dice = new Dice(notation);

    const rolls = [];
    for (let i = 0; i < dice.quantity; i++) {
      const roll = Math.floor(Math.random() * dice.sides + 1);
      rolls.push(roll);
    }

    return rolls;
  }

  total(rolls: number[]): number {
    return rolls.reduce((a, b) => a + b, 0);
  }
}

export const d20 = new D20();
export default d20;
