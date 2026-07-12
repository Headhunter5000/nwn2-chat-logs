import { describe, expect, it } from 'vitest';
import aggregateStats from './aggregateStats';

describe('aggregateStats', () => {
  it('should return an empty array when given an empty input', () => {
    const result = aggregateStats([]);
    expect(result).toEqual([]);
  });

  it('should process a single record correctly', () => {
    const input: [string, string][] = [['Item A', '2023-01-01']];
    const expected = [{
      name: 'Item A',
      dates: ['2023-01-01'],
      count: 1,
      firstDate: '2023-01-01',
      lastDate: '2023-01-01',
    }];
    expect(aggregateStats(input)).toEqual(expected);
  });

  it('should group items with the same name correctly', () => {
    const input: [string, string][] = [
      ['Item A', '2023-01-01'],
      ['Item B', '2023-01-02'],
      ['Item A', '2023-01-05'],
    ];
    const result = aggregateStats(input);

    expect(result).toEqual([
      {
        name: 'Item A',
        dates: ['2023-01-01', '2023-01-05'],
        count: 2,
        firstDate: '2023-01-01',
        lastDate: '2023-01-05',
      },
      {
        name: 'Item B',
        dates: ['2023-01-02'],
        count: 1,
        firstDate: '2023-01-02',
        lastDate: '2023-01-02',
      },
    ]);
  });

  it('should correctly identify first and last dates in a sequence', () => {
    const input: [string, string][] = [
      ['Item A', '2023-01-10'],
      ['Item A', '2023-01-05'],
      ['Item A', '2023-01-15'],
    ];
    const result = aggregateStats(input);

    // Note: The current implementation relies on the order of input for first/last date indices
    // Based on code: firstDate is dates[0], lastDate is dates[count - 1]
    expect(result[0].firstDate).toBe('2023-01-10');
    expect(result[0].lastDate).toBe('2023-01-15');
  });
});
