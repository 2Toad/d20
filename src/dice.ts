import { DiceNotation } from "./types";

const INVALID_FORMAT_ERROR = "Invalid format. Quantity (N) and Sides (X) are required: NdX";

export class Dice {
  quantity: number;
  sides: number;

  constructor(notation: DiceNotation) {
    if (!/^\d+d\d+$/i.test(notation)) {
      throw new Error(INVALID_FORMAT_ERROR);
    }

    const [quantityStr, sidesStr] = notation.toLowerCase().split("d");
    this.quantity = Number(quantityStr);
    this.sides = Number(sidesStr);

    this.validate();
  }

  private validate(): void {
    if (!Number.isInteger(this.quantity) || !Number.isInteger(this.sides)) {
      throw new Error(INVALID_FORMAT_ERROR);
    }

    if (this.quantity < 1) {
      throw new Error("Invalid quantity. A minimum of one die is required: 1dX");
    }
    if (this.sides < 2) {
      throw new Error("Invalid number of sides. A minimum of two sides is required: Nd2");
    }
  }
}
