export class Dice {
  quantity: number;

  sides: number;

  constructor(notation: string = "") {
    const parts = notation.toLowerCase().split("d");
    if (parts.length !== 2) {
      throw new Error("Invalid format. Quantity (N) and Sides (X) are required: NdX");
    }

    this.quantity = parseInt(parts[0], 10);
    this.sides = parseInt(parts[1], 10);

    this.validate();
  }

  private validate(): void {
    if (Number.isNaN(this.quantity) || Number.isNaN(this.sides)) {
      throw new Error("Invalid format. Quantity (N) and Sides (X) are required: NdX");
    }

    if (this.quantity < 1) {
      throw new Error("Invalid quantity. A miminum of one die is required: 1dX");
    }
    if (this.sides < 2) {
      throw new Error("Invalid number of sides. A minimum of two sides is required: Nd2");
    }
  }
}
