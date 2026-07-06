import { describe, expect, it } from 'vitest';
import { createMoneyMask, createPercentageMask } from './masks';

describe('createMoneyMask', () => {
  it('formats numeric values with thousands separators', () => {
    const mask = createMoneyMask({ locale: 'en-US' });

    expect(mask.format(1250)).toBe('1,250');
    expect(mask.prefixText).toBe('$');
    expect(mask.inputmode).toBe('numeric');
  });

  it('preserves empty input as null', () => {
    const mask = createMoneyMask({ locale: 'en-US' });

    expect(mask.parse('', 1250)).toBeNull();
    expect(mask.parse('$', 1250)).toBeNull();
    expect(mask.format(null)).toBe('');
  });

  it('parses formatted input into a number', () => {
    const mask = createMoneyMask({ locale: 'en-US' });

    expect(mask.parse('$1,250', null)).toBe(1250);
    expect(mask.parse('abc', 500)).toBeNull();
  });

  it('clamps normalized values on blur', () => {
    const mask = createMoneyMask({ locale: 'en-US', min: 10, max: 100 });

    expect(mask.normalizeOnBlur?.(5)).toBe(10);
    expect(mask.normalizeOnBlur?.(150)).toBe(100);
    expect(mask.normalizeOnBlur?.(50)).toBe(50);
    expect(mask.normalizeOnBlur?.(null)).toBeNull();
  });

  it('supports custom prefix and decimal input', () => {
    const mask = createMoneyMask({
      locale: 'en-US',
      prefixText: 'AUD ',
      maximumFractionDigits: 2
    });

    expect(mask.prefixText).toBe('AUD ');
    expect(mask.inputmode).toBe('decimal');
    expect(mask.parse('12.50', null)).toBe(12.5);
  });
});

describe('createPercentageMask', () => {
  it('formats and parses percentage values', () => {
    const mask = createPercentageMask();

    expect(mask.format(25)).toBe('25');
    expect(mask.suffixText).toBe('%');
    expect(mask.inputmode).toBe('decimal');
    expect(mask.parse('25%', null)).toBe(25);
  });

  it('preserves empty input as null', () => {
    const mask = createPercentageMask();

    expect(mask.parse('', 25)).toBeNull();
    expect(mask.parse('%', 25)).toBeNull();
    expect(mask.format(null)).toBe('');
  });

  it('clamps normalized values to min and max', () => {
    const mask = createPercentageMask({ min: 5, max: 95 });

    expect(mask.normalizeOnBlur?.(2)).toBe(5);
    expect(mask.normalizeOnBlur?.(125)).toBe(95);
    expect(mask.normalizeOnBlur?.(50)).toBe(50);
  });
});
