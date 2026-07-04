import { describe, expect, it } from 'vitest';
import { expectNotToEqualJSON, expectToEqualJSON, renderWithProviders } from './testUtils';

describe('testUtils', () => {
  describe('renderWithProviders', () => {
    it('should render a component wrapped in providers', () => {
      renderWithProviders(<div />);
    });
  });

  describe('expectToEqualJSON', () => {
    it('should pass when objects are equal', () => {
      const obj1 = { a: 1, b: [1, 2] };
      const obj2 = { a: 1, b: [1, 2] };
      expectToEqualJSON(obj1, obj2);
    });

    it('should fail when objects are different', () => {
      const obj1 = { a: 1, b: [1, 2] };
      const obj2 = { a: 1, b: [1, 3] };
      expect(() => expectToEqualJSON(obj1, obj2)).toThrow();
    });
  });

  describe('expectNotToEqualJSON', () => {
    it('should pass when objects are different', () => {
      const obj1 = { a: 1, b: [1, 2] };
      const obj2 = { a: 1, b: [1, 3] };
      expectNotToEqualJSON(obj1, obj2);
    });

    it('should fail when objects are equal', () => {
      const obj1 = { a: 1, b: [1, 2] };
      const obj2 = { a: 1, b: [1, 2] };
      expect(() => expectNotToEqualJSON(obj1, obj2)).toThrow(); 
    });
  });
});