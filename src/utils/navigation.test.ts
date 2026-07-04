import { buildCharacterUrl } from './navigation';

describe('buildCharacterUrl', () => {
  it('should return basic character path when only name is provided', () => {
    expect(buildCharacterUrl('hero')).toBe('/characters/hero');
  });

  it('should append date to the path when both name and date are provided', () => {
    expect(buildCharacterUrl('hero', '2023-10-11')).toBe('/characters/hero/2023-10-11');
  });

  it('should append index to the path when name, date, and index are all provided', () => {
    expect(buildCharacterUrl('hero', '2023-10-11', 5)).toBe('/characters/hero/2023-10-11/5');
  });

  it('should not append index if date is missing even if index is provided', () => {
    expect(buildCharacterUrl('hero', '', 5)).toBe('/characters/hero');
  });

  it('should handle empty strings correctly for optional parameters', () => {
    expect(buildCharacterUrl('hero', '')).toBe('/characters/hero');
  });
});
