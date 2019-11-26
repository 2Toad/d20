import { expect } from 'chai';

import { roll, dice } from '../src';
import { DiceHelper } from './dice-helper';
import { RollHelper } from './roll-helper';

describe('d20', () => {
  describe('dice', () => {
    it('should throw an error when no param is passed in', () => {
      expect(dice.bind('dice')).to.throw('Invalid format. Quantity (N) and Sides (X) are required: NdX');
    });

    it('should throw an error when invalid notation is used', () => {
      expect(dice.bind('dice', 'd')).to.throw('Invalid format. Quantity (N) and Sides (X) are required: NdX');
      expect(dice.bind('dice', '2d')).to.throw('Invalid format. Quantity (N) and Sides (X) are required: NdX');
      expect(dice.bind('dice', 'd6')).to.throw('Invalid format. Quantity (N) and Sides (X) are required: NdX');
      expect(dice.bind('dice', '26')).to.throw('Invalid format. Quantity (N) and Sides (X) are required: NdX');
    });

    it('should return an array of numbers', () => {
      const result = dice('2d6');

      expect(Array.isArray(result)).to.equal(true);
      expect(typeof result[0]).to.equal('number');
    });

    it('should roll 1d6', () => {
      const result = DiceHelper.test(1, 6);

      expect(result.rolls / DiceHelper.sampleSize).to.equal(result.quantity);
      expect(result.min).to.greaterThan(0);
      expect(result.max).to.lessThan(result.sides + 1);
    });

    it('should roll 3d6', () => {
      const result = DiceHelper.test(3, 6);

      expect(result.rolls / DiceHelper.sampleSize).to.equal(result.quantity);
      expect(result.min).to.greaterThan(0);
      expect(result.max).to.lessThan(result.sides + 1);
    });

    it('should roll 20d10', () => {
      const result = DiceHelper.test(20, 10);

      expect(result.rolls / DiceHelper.sampleSize).to.equal(result.quantity);
      expect(result.min).to.greaterThan(0);
      expect(result.max).to.lessThan(result.sides + 1);
    });
  });

  describe('roll', () => {
    it('should return a number', () => {
      const result = roll('2d6');

      expect(typeof result).to.equal('number');
    });

    it('should roll 1d100', () => {
      const result = RollHelper.test(1, 100);

      expect(result.min).to.greaterThan(0);
      expect(result.max).to.lessThan(result.possible + 1);
    });

    it('should roll 3d6', () => {
      const result = RollHelper.test(3, 6);

      expect(result.min).to.greaterThan(0);
      expect(result.max).to.lessThan(result.possible + 1);
    });

    it('should roll 20d10', () => {
      const result = RollHelper.test(20, 10);

      expect(result.min).to.greaterThan(0);
      expect(result.max).to.lessThan(result.possible + 1);
    });
  });
});
