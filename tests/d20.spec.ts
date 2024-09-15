import { expect } from "chai";

import { roll, dice, LARGE_DICE_QUANTITY } from "../src";
import { DiceHelper } from "./dice-helper";
import { RollHelper } from "./roll-helper";

describe("d20", () => {
  describe("dice", () => {
    it("should throw an error when no param is passed in", () => {
      // @ts-expect-error Intentionally calling with no argument to test error handling
      expect(() => dice()).to.throw("Invalid format. Quantity (N) and Sides (X) are required: NdX");
    });

    it("should throw an error when invalid notation is used", () => {
      // @ts-expect-error Intentionally calling with invalid argument to test error handling
      expect(() => dice("d")).to.throw("Invalid format. Quantity (N) and Sides (X) are required: NdX");
      // @ts-expect-error Intentionally calling with invalid argument to test error handling
      expect(() => dice("2d")).to.throw("Invalid format. Quantity (N) and Sides (X) are required: NdX");
      // @ts-expect-error Intentionally calling with invalid argument to test error handling
      expect(() => dice("d6")).to.throw("Invalid format. Quantity (N) and Sides (X) are required: NdX");
      // @ts-expect-error Intentionally calling with invalid argument to test error handling
      expect(() => dice("26")).to.throw("Invalid format. Quantity (N) and Sides (X) are required: NdX");
      expect(() => dice("2.0d6")).to.throw("Invalid format. Quantity (N) and Sides (X) are required: NdX");
      expect(() => dice("2d6.0")).to.throw("Invalid format. Quantity (N) and Sides (X) are required: NdX");
    });

    it("should return an array of numbers", () => {
      const result = dice("2d6");

      expect(Array.isArray(result)).to.equal(true);
      expect(typeof result[0]).to.equal("number");
    });

    it("should roll 1d6", () => {
      const result = DiceHelper.test(1, 6);

      expect(result.rolls / DiceHelper.sampleSize).to.equal(result.quantity);
      expect(result.min).to.be.greaterThan(0);
      expect(result.max).to.be.lessThan(result.sides + 1);
    });

    it("should roll 3d6", () => {
      const result = DiceHelper.test(3, 6);

      expect(result.rolls / DiceHelper.sampleSize).to.equal(result.quantity);
      expect(result.min).to.be.greaterThan(0);
      expect(result.max).to.be.lessThan(result.sides + 1);
    });

    it("should roll 20d10", () => {
      const result = DiceHelper.test(20, 10);

      expect(result.rolls / DiceHelper.sampleSize).to.equal(result.quantity);
      expect(result.min).to.be.greaterThan(0);
      expect(result.max).to.be.lessThan(result.sides + 1);
    });

    it("should roll 100d20", () => {
      const result = DiceHelper.test(100, 20);

      expect(result.rolls / DiceHelper.sampleSize).to.equal(result.quantity);
      expect(result.min).to.be.greaterThan(0);
      expect(result.max).to.be.lessThan(result.sides + 1);
    });

    it("should handle the concept of maximum array length", () => {
      const MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1; // 4,294,967,295 (max array length in JS)
      const result = dice(`${MAX_ARRAY_LENGTH}d6`);

      expect(result).to.satisfy((r: any) => Array.isArray(r) || Symbol.iterator in Object(r));

      // Check the first few values
      const firstFew: number[] = [];
      let count = 0;
      for (const value of result) {
        firstFew.push(value);
        count++;
        if (count >= 5) break;
      }

      expect(firstFew).to.have.lengthOf(5);
      firstFew.forEach((value) => {
        expect(value).to.be.within(1, 6);
      });
    });

    it("should handle a large number of dice", () => {
      const NON_LARGE_DICE_QTY = LARGE_DICE_QUANTITY - 1;
      const result = dice(`${NON_LARGE_DICE_QTY}d6`);

      if (Array.isArray(result)) {
        expect(result).to.have.lengthOf(NON_LARGE_DICE_QTY);

        // Check a sample of values
        const sample = result.slice(0, 1000);
        sample.forEach((value) => {
          expect(value).to.be.within(1, 6);
        });
      } else {
        // If it's an iterator, we'll check the first 1000 values
        let count = 0;
        for (const value of result) {
          expect(value).to.be.within(1, 6);
          count++;
          if (count >= 1000) break;
        }
        expect(count).to.equal(1000);
      }
    });

    it("should throw an error for invalid lower limits", () => {
      expect(() => dice("0d6")).to.throw("Invalid quantity. A minimum of one die is required: 1dX");
      expect(() => dice("1d1")).to.throw("Invalid number of sides. A minimum of two sides is required: Nd2");
    });
  });

  describe("roll", () => {
    it("should return a number", () => {
      const result = roll("2d6");

      expect(typeof result).to.equal("number");
    });

    it("should roll 1d100", () => {
      const result = RollHelper.test(1, 100);

      expect(result.min).to.be.greaterThan(0);
      expect(result.max).to.be.lessThan(result.possible + 1);
    });

    it("should roll 3d6", () => {
      const result = RollHelper.test(3, 6);

      expect(result.min).to.be.greaterThan(0);
      expect(result.max).to.be.lessThan(result.possible + 1);
    });

    it("should roll 20d10", () => {
      const result = RollHelper.test(20, 10);

      expect(result.min).to.be.greaterThan(0);
      expect(result.max).to.be.lessThan(result.possible + 1);
    });
  });

  describe("randomness", () => {
    it("should produce consistent results with the same string seed", () => {
      const seed = "Dungeons & Dragons®";
      const notation = "3d7";

      const result1 = roll(notation, seed);
      const result2 = roll(notation, seed);

      expect(result1).to.equal(result2);
    });

    it("should produce consistent results with the same string seed (dice)", () => {
      const seed = "Dungeons & Dragons®";
      const notation = "3d7";

      const result1 = dice(notation, seed);
      const result2 = dice(notation, seed);

      // Since dice returns an array or iterator, we need to compare the values
      if (Array.isArray(result1) && Array.isArray(result2)) {
        expect(result1).to.deep.equal(result2);
      } else {
        // For iterators, we'll compare the first few values
        const values1 = Array.from(result1).slice(0, 10);
        const values2 = Array.from(result2).slice(0, 10);
        expect(values1).to.deep.equal(values2);
      }
    });

    it("should produce consistent results with the same numeric seed", () => {
      const seed = "123456";
      const notation = "3d6";

      const result1 = roll(notation, seed);
      const result2 = roll(notation, seed);

      expect(result1).to.equal(result2);
    });

    it("should produce sufficiently different results with different seeds", () => {
      const notation = "3d6";
      const seeds = ["apple", "banana", "cherry", "date", "elderberry"];
      const rollsPerSeed = 10;
      const minExpectedUniqueSeedResults = 2;

      const results = seeds.map((seed) => {
        const rolls = Array(rollsPerSeed)
          .fill(0)
          .map(() => roll(notation, seed));
        return rolls;
      });

      // Check that results for each seed are consistent
      results.forEach((seedRolls, index) => {
        expect(new Set(seedRolls).size).to.equal(1, `Seed "${seeds[index]}" should produce consistent results`);
      });

      // Check that at least some results are different across seeds
      const uniqueResults = new Set(results.map((seedRolls) => seedRolls[0]));
      expect(uniqueResults.size).to.be.at.least(
        minExpectedUniqueSeedResults,
        `Different seeds should produce at least ${minExpectedUniqueSeedResults} different results`,
      );
    });

    it("should produce different results when no seed is provided", () => {
      const notation = "3d6";
      const rollCount = 100;
      const significantDifference = 10; // Number of rolls that should be different

      const results1 = Array(rollCount)
        .fill(0)
        .map(() => roll(notation));
      const results2 = Array(rollCount)
        .fill(0)
        .map(() => roll(notation));

      let differences = 0;
      for (let i = 0; i < rollCount; i++) {
        if (results1[i] !== results2[i]) {
          differences++;
        }
      }

      expect(differences).to.be.at.least(
        significantDifference,
        `Expected at least ${significantDifference} different results out of ${rollCount} rolls`,
      );
    });

    it("should handle empty string seeds", () => {
      const notation = "3d6";

      const result1 = roll(notation, "");
      const result2 = roll(notation, "");

      expect(result1).to.equal(result2);
    });

    it("should handle long string seeds", () => {
      const notation = "3d6";
      const longSeed = "a".repeat(1000);

      const result1 = roll(notation, longSeed);
      const result2 = roll(notation, longSeed);

      expect(result1).to.equal(result2);
    });
  });
});
