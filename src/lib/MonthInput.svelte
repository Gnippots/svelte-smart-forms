<script lang="ts">
  import TextInput from './TextInput.svelte';
  import type { FormState } from './Interfaces';

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

  const monthLookup = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  function formatMonth(currentValue: string | Date | null | undefined) {
    if (!currentValue) {
      return '';
    }

    const monthDate =
      currentValue instanceof Date
        ? currentValue
        : /^\d{4}-\d{2}$/.test(currentValue)
          ? new Date(`${currentValue}-01`)
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

  // Kept for backwards compatibility while the specialized component is deprecated.
  void container;
  void minDate;
  void maxDate;
</script>

<TextInput
  {label}
  {classes}
  {name}
  bind:value
  {formState}
  {required}
  {disabled}
  {onChange}
  {placeholder}
  {showValidation}
  format={formatMonth}
  parse={(inputValue) => parseMonth(inputValue)}
/>