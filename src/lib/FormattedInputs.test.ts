import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import CashInput from './CashInput.svelte';
import MonthInput from './MonthInput.svelte';
import PercentageInput from './PercentageInput.svelte';
import { blur, expectField, inputValue, renderField } from './test-helpers';

const airDatepickerMock = vi.hoisted(() => {
  return {
    latestOptions: undefined as
      | {
          onSelect?: (event: { date: Date; datepicker: { hide: () => void } }) => void;
        }
      | undefined
  };
});

vi.mock('air-datepicker', () => {
  return {
    default: class AirDatepickerMock {
      selectedDates: Array<Date> = [];

      constructor(_element: HTMLInputElement, options: typeof airDatepickerMock.latestOptions) {
        airDatepickerMock.latestOptions = options;
      }

      clear() {
        this.selectedDates = [];
      }

      selectDate(date: Date) {
        this.selectedDates = [date];
      }

      destroy() {}
    }
  };
});

describe('formatted input wrappers', () => {
  it('renders CashInput with a default dollar prefix and parses formatted values', async () => {
    const { container, formState } = await renderField(CashInput, {
      name: 'cash',
      value: 1250
    });

    expect(container.querySelector('.smart-forms-input-affix')?.textContent).toBe('$');

    const input = container.querySelector('input[name="cash"]');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect((input as HTMLInputElement).value).toBe('1,250');

    await inputValue(input as HTMLInputElement, '$2,500');
    expectField(formState, 'cash', 2500);
  });

  it('clamps CashInput values on blur', async () => {
    const { container, formState } = await renderField(CashInput, {
      name: 'cash',
      value: 50,
      min: 10,
      max: 100
    });

    const input = container.querySelector('input[name="cash"]');
    expect(input).toBeInstanceOf(HTMLInputElement);

    await inputValue(input as HTMLInputElement, '150');
    await blur(input as HTMLInputElement);
    expectField(formState, 'cash', 100);
  });

  it('renders PercentageInput with a suffix and clamps values on blur', async () => {
    const { container, formState } = await renderField(PercentageInput, {
      name: 'percent',
      value: 25,
      min: 0,
      max: 100
    });

    expect(container.querySelector('.smart-forms-input-affix')?.textContent).toBe('%');

    const input = container.querySelector('input[name="percent"]');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect((input as HTMLInputElement).value).toBe('25');

    await inputValue(input as HTMLInputElement, '125%');
    await blur(input as HTMLInputElement);
    expectField(formState, 'percent', 100);
  });

  it('formats MonthInput values and syncs picker selections', async () => {
    const { container, formState } = await renderField(MonthInput, {
      name: 'month',
      value: '2026-04'
    });

    const input = container.querySelector('input[name="month"]');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect((input as HTMLInputElement).value).toBe('Apr 2026');
    expect(input?.hasAttribute('readonly')).toBe(true);

    airDatepickerMock.latestOptions?.onSelect?.({
      date: new Date(2026, 4, 1),
      datepicker: { hide: vi.fn() }
    });
    await tick();
    expectField(formState, 'month', '2026-05');
  });
});
