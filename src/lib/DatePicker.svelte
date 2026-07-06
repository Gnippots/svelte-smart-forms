<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
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
    placeholder = 'Choose Date',
    showValidation = true,
    container = '',
    minDate,
    maxDate
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
  let datepicker: AirDatepicker | undefined = $state();
  let inputElement: HTMLInputElement | undefined = $state();

  function toDate(currentValue: string | Date | null | undefined) {
    if (!currentValue) {
      return null;
    }

    if (currentValue instanceof Date) {
      return currentValue;
    }

    const isoDateMatch = currentValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const dateValue = isoDateMatch
      ? new Date(Number(isoDateMatch[1]), Number(isoDateMatch[2]) - 1, Number(isoDateMatch[3]))
      : new Date(currentValue);

    return Number.isNaN(dateValue.getTime()) ? null : dateValue;
  }

  function formatForStorage(dateValue: Date) {
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, '0');
    const day = String(dateValue.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatForDisplay(currentValue: string | Date | null | undefined) {
    const dateValue = toDate(currentValue);
    if (!dateValue) {
      return '';
    }

    return dateValue.toLocaleDateString('en-GB');
  }

  const displayDate = $derived(formatForDisplay(value));
  const selectedDate = $derived(toDate(value));

  onMount(async () => {
    await tick();

    if (!inputElement) {
      return;
    }

    datepicker = new AirDatepicker(inputElement, {
      view: 'days',
      minView: 'days',
      dateFormat: 'dd/MM/yyyy',
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
      inputElement.value = displayDate;
    }

    if (!datepicker) {
      return;
    }

    const currentPickerDate = datepicker.selectedDates[0];

    if (!selectedDate) {
      datepicker.clear({ silent: true });
      return;
    }

    if (!currentPickerDate || selectedDate.getTime() !== currentPickerDate.getTime()) {
      datepicker.selectDate(selectedDate, { silent: true });
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
    class="dateInput"
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
  {placeholder}
  {required}
  {name}
  {disabled}
  {value}
  bind:fieldState
  {formState}
  {onChange}
  {showValidation}
  input={input}
>
</BaseInput>