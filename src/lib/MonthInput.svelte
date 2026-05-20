<script lang="ts">
  import BaseInput from './BaseInput.svelte';
  import { createFieldState } from './FieldState.svelte';
  import type { FieldState, FormState } from './Interfaces';
  import AirDatepicker from 'air-datepicker';
  import 'air-datepicker/air-datepicker.css';
  import en from 'air-datepicker/locale/en';
  import { onDestroy, onMount, tick } from 'svelte';

  interface Props {
    label?: string;
    value?: string | Date | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    placeholder?: string;
    showValidation?: boolean;
    container?: string;
    minDate?: Date;
    maxDate?: Date;
  }

  let {
    label = '',
    value = $bindable(null),
    required = false,
    name = '',
    disabled = false,
    formState,
    classes = 'smart-form-input',
    onChange = () => {},
    placeholder = 'MMM, YYYY',
    showValidation = true,
    container = '',
    minDate = undefined,
    maxDate = undefined
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
  let datepicker: AirDatepicker | undefined = $state();
  let inputElement: HTMLInputElement | undefined = $state();

  const monthLookup = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  function toLocalMonthDate(monthValue: string) {
    const [year, month] = monthValue.split('-').map(Number);
    return new Date(year, month - 1, 1);
  }

  function formatMonth(currentValue: string | Date | null | undefined) {
    if (!currentValue) {
      return '';
    }

    const monthDate =
      currentValue instanceof Date
        ? currentValue
        : /^\d{4}-\d{2}$/.test(currentValue)
          ? toLocalMonthDate(currentValue)
          : new Date(currentValue);

    if (Number.isNaN(monthDate.getTime())) {
      return String(currentValue);
    }

    return monthDate.toLocaleString('default', { month: 'short', year: 'numeric' });
  }

  function parseMonth(inputValue: string) {
    const normalized = inputValue.trim();

    if (!normalized) {
      return null;
    }

    if (/^\d{4}-\d{2}$/.test(normalized)) {
      return normalized;
    }

    const monthYearMatch = normalized.match(/^([A-Za-z]{3,9})[\s,/.-]+(\d{4})$/);
    if (monthYearMatch) {
      const monthIndex = monthLookup.indexOf(monthYearMatch[1].slice(0, 3).toLowerCase());
      if (monthIndex !== -1) {
        return `${monthYearMatch[2]}-${String(monthIndex + 1).padStart(2, '0')}`;
      }
    }

    const numericMonthMatch = normalized.match(/^(\d{1,2})[\s,/.-]+(\d{4})$/);
    if (numericMonthMatch) {
      const month = Number(numericMonthMatch[1]);
      if (month >= 1 && month <= 12) {
        return `${numericMonthMatch[2]}-${String(month).padStart(2, '0')}`;
      }
    }

    return normalized;
  }

  function formatForStorage(dateValue: Date) {
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  function toSelectedMonth(currentValue: string | Date | null | undefined) {
    if (!currentValue) {
      return null;
    }

    if (currentValue instanceof Date) {
      return new Date(currentValue.getFullYear(), currentValue.getMonth(), 1);
    }

    const parsedMonth = parseMonth(currentValue);
    return parsedMonth && /^\d{4}-\d{2}$/.test(parsedMonth) ? toLocalMonthDate(parsedMonth) : null;
  }

  const displayMonth = $derived(formatMonth(value));
  const selectedMonth = $derived(toSelectedMonth(value));

  onMount(async () => {
    await tick();

    if (!inputElement) {
      return;
    }

    datepicker = new AirDatepicker(inputElement, {
      view: 'months',
      minView: 'months',
      dateFormat: 'MMM yyyy',
      autoClose: true,
      locale: en,
      container,
      minDate,
      maxDate,
      onSelect({ date, datepicker: instance }) {
        const selectedDate = Array.isArray(date) ? date[0] : date;

        value = selectedDate ? formatForStorage(selectedDate) : null;
        onChange();
        instance.hide();
      }
    });
  });

  $effect(() => {
    if (inputElement) {
      inputElement.value = displayMonth;
    }

    if (!datepicker) {
      return;
    }

    const currentPickerDate = datepicker.selectedDates[0];

    if (!selectedMonth) {
      datepicker.clear({ silent: true });
      return;
    }

    if (!currentPickerDate || selectedMonth.getTime() !== currentPickerDate.getTime()) {
      datepicker.selectDate(selectedMonth, { silent: true });
    }
  });

  onDestroy(() => {
    datepicker?.destroy();
  });
</script>

{#snippet input()}
  <input
    id={name}
    {name}
    class="monthInput"
    {placeholder}
    {required}
    {disabled}
    type="text"
    readonly
    onblur={() => {
      fieldState.blur();
    }}
    bind:this={inputElement}
  />
{/snippet}

<BaseInput
  {label}
  {classes}
  {name}
  {value}
  bind:fieldState
  {formState}
  {required}
  {disabled}
  {placeholder}
  {onChange}
  {showValidation}
  input={input}
>
</BaseInput>