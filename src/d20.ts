import { Dice } from "./dice";

export const dice = (notation: string): number[] => {
  const d = new Dice(notation);

  const rolls = [];
  for (let i = 0; i < d.quantity; i += 1) {
    const r = Math.floor(Math.random() * d.sides + 1);
    rolls.push(r);
  }

  return rolls;
};

export const roll = (notation: string): number => {
  const rolls = dice(notation);
  return rolls.reduce((a, b) => a + b, 0);
};

export const d20 = {
  dice,
  roll,
};
