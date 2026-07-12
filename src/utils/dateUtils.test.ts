import { describe, expect, it } from 'vitest';
import { formatDate, getDateFromISOString, getIsoStringFromDate } from './dateUtils';

describe('dateUtils', () => {
  describe('getDateFromISOString', () => {
    it('returns the date part of a valid ISO string', () => {
      const iso = '2025-12-25T10:30:00Z';
      expect(getDateFromISOString(iso)).toBe('2025-12-25');
    });

    it('returns undefined for nullish input', () => {
      // @ts-expect-error testing runtime null
      const result = getDateFromISOString(undefined);
      expect(result).toBeUndefined();
    });
  });

  describe('getIsoStringFromDate', () => {
    it('converts a Date object to ISO string', () => {
      const date = new Date(2025, 11, 25, 10, 30, 0); // Dec is month 11
      expect(getIsoStringFromDate(date)).toBe(date.toISOString());
    });

    it('converts a timestamp number to ISO string', () => {
      const ts = 1767061800000; // corresponds to 2025-12-25T10:30:00Z
      expect(getIsoStringFromDate(ts)).toBe(new Date(ts).toISOString());
    });

    it('converts an ISO string to itself', () => {
      const iso = '2025-12-25T10:30:00Z';
      expect(getIsoStringFromDate(iso)).toBe(new Date(iso).toISOString());
    });

    describe('formatDate', () => {
      it('formats a Date object to a local date string', () => {
        const date = new Date(2025, 11, 25);
        expect(formatDate(date)).toEqual('25.12.2025');
      });

      it('formats an ISO string to a local date string', () => {
        const iso = '2025-12-18T10:30:00Z';
        expect(formatDate(iso)).toEqual('18.12.2025');
      });
    });
  });
});