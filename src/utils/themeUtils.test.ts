import type { ThemeType } from 'grommet';
import { describe, expect, it } from 'vitest';
import {
  chooseByTheme,
  convertHslToHsla,
  getColor,
  getIsDarkTheme,
  getThemeProp,
  transparentBlack,
  transparentWhite,
} from './themeUtils';

describe('themeUtils', () => {
  const mockTheme = {
    dark: true,
    global: {
      colors: {
        brand: '#3498db',
        background: {
          light: '#ebe7e0',
          dark: '#121416',
        },
      },
    },
    spacing: {
      small: 8,
      medium: 16,
    },
  } as ThemeType;

  const mockLightTheme = {
    ...mockTheme,
    dark: false,
  } as ThemeType;

  describe('getIsDarkTheme', () => {
    it('should return true when dark theme is enabled', () => {
      expect(getIsDarkTheme({ theme: mockTheme })).toBe(true);
    });

    it('should return false when dark theme is disabled', () => {
      expect(getIsDarkTheme({ theme: mockLightTheme })).toBe(false);
    });
  });

  describe('chooseByTheme', () => {
    it('should return darkCss when current theme is dark', () => {
      const result = chooseByTheme('light-css', 'dark-css')({ theme: mockTheme });
      expect(result).toBe('dark-css');
    });

    it('should return lightCss when current theme is light', () => {
      const result = chooseByTheme('light-css', 'dark-css')({ theme: mockLightTheme });
      expect(result).toBe('light-css');
    });
  });

  describe('getThemeProp', () => {
    it('should return a property from the theme object', () => {
      const result = getThemeProp('global.colors.brand')({ theme: mockTheme });
      expect(result).toBe('#3498db');
    });

    it('should fall back to provided value if prop is not found or valid type', () => {
      const result = getThemeProp('invalid.prop', 'fallback-value')({ theme: mockTheme });
      expect(result).toBe('fallback-value');
    });

    it('should return undefined if no fallback is provided and property is missing', () => {
      const result = getThemeProp('non.existent_prop')({ theme: mockTheme });
      expect(result).toBeUndefined();
    });
  });

  describe('getColor', () => {
    it('should return a color string using normalizeColor', () => {
      // Since we don't see the internal logic of normalizeColor,
      // but it's expected to process the name against the theme.
      const result = getColor('background')({ theme: mockTheme });
      expect(result).toBe('#121416');
    });
  });

  describe('transparentWhite', () => {
    it('should return correct hsla string for 50% opacity', () => {
      expect(transparentWhite(50)).toBe('hsla(0, 0%, 100%, 0.5)');
    });

    it('should clamp values between 0 and 100', () => {
      expect(transparentWhite(120)).toBe('hsla(0, 0%, 100%, 1)');
      expect(transparentWhite(-20)).toBe('hsla(0, 0%, 100%, 0)');
    });
  });

  describe('transparentBlack', () => {
    it('should return correct hsla string for 50% opacity', () => {
      expect(transparentBlack(50)).toBe('hsla(0, 0%, 0%, 0.5)');
    });

    it('should clamp values between 0 and 100', () => {
      expect(transparentBlack(120)).toBe('hsla(0, 0%, 0%, 1)');
      expect(transparentBlack(-20)).toBe('hsla(0, 0%, 0%, 0)');
    });
  });

  describe('convertHslToHsla', () => {
    it('should convert valid HSL string to HSLA', () => {
      expect(convertHslToHsla('180, 50%, 50%')).toBe('hsla(180, 50%, 50%, 1)');
    });

    it('should convert with custom opacity', () => {
      expect(convertHslToHsla('180, 50%, 50%', 70)).toBe('hsla(180, 50%, 50%, 0.7)');
    });

    it('should throw an error for invalid format', () => {
      expect(() => convertHslToHsla('invalid')).toThrow('Incopatible HSL-Format');
    });
  });
});
