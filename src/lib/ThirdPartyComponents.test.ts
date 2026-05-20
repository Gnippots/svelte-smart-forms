import { describe, expect, it, vi } from 'vitest';
import AddressField from './AddressField.svelte';
import DatePicker from './DatePicker.svelte';
import { expectField, renderField } from './test-helpers';

vi.mock('air-datepicker', () => {
  return {
    default: class AirDatepickerMock {
      selectedDates: Array<Date> = [];

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
