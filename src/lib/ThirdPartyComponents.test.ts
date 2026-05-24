import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import AddressField from './AddressField.svelte';
import DatePicker from './DatePicker.svelte';
import TimePicker from './TimePicker.svelte';
import { expectField, renderField } from './test-helpers';

const airDatepickerMock = vi.hoisted(() => {
  return {
    latestOptions: undefined as
      | {
          timepicker?: boolean;
          onlyTimepicker?: boolean;
          timeFormat?: string;
          minutesStep?: number;
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

describe('third-party backed components', () => {
  it('registers DatePicker values and formats the visible input', async () => {
    const { container, formState } = await renderField(DatePicker, {
      name: 'date',
      value: '2026-04-08'
    });

    const input = container.querySelector('input[name="date"]');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect((input as HTMLInputElement).value).toBe('08/04/2026');
    expectField(formState, 'date', '2026-04-08');
  });

  it('registers TimePicker values and stores selected times as HH:mm', async () => {
    const { container, formState } = await renderField(TimePicker, {
      name: 'time',
      value: '09:30',
      minutesStep: 5
    });

    const input = container.querySelector('input[name="time"]');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect((input as HTMLInputElement).value).toBe('09:30');
    expect(input?.hasAttribute('readonly')).toBe(true);
    expect(airDatepickerMock.latestOptions?.timepicker).toBe(true);
    expect(airDatepickerMock.latestOptions?.onlyTimepicker).toBe(true);
    expect(airDatepickerMock.latestOptions?.timeFormat).toBe('HH:mm');
    expect(airDatepickerMock.latestOptions?.minutesStep).toBe(5);

    airDatepickerMock.latestOptions?.onSelect?.({
      date: new Date(1970, 0, 1, 14, 45),
      datepicker: { hide: vi.fn() }
    });
    await tick();

    expectField(formState, 'time', '14:45');
  });

  it('registers AddressField using the formatted address search text', async () => {
    const { formState } = await renderField(AddressField, {
      name: 'address',
      address: {
        unit_number: '2',
        street_number: '10',
        street_name: 'Example Street',
        city: 'Melbourne',
        state: 'VIC',
        postcode: '3000',
        country: 'Australia',
        po_box: ''
      }
    });

    expectField(formState, 'address', '2/10 Example Street, Melbourne VIC 3000, Australia');
  });
});
