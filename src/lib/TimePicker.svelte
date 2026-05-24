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
    timeFormat?: string;
    minHours?: number;
    maxHours?: number;
    minMinutes?: number;
    maxMinutes?: number;
    hoursStep?: number;
    minutesStep?: number;
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
    placeholder = 'Choose Time',
    showValidation = true,
    container = '',
    timeFormat = 'HH:mm',
    minHours = undefined,
    maxHours = undefined,
    minMinutes = undefined,
    maxMinutes = undefined,
    hoursStep = undefined,
    minutesStep = undefined
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
  let datepicker: AirDatepicker | undefined = $state();
  let inputElement: HTMLInputElement | undefined = $state();

  function padTimePart(value: number) {
    return String(value).padStart(2, '0');
  }

  function formatForStorage(dateValue: Date) {
    return `${padTimePart(dateValue.getHours())}:${padTimePart(dateValue.getMinutes())}`;
  }

  function toTimeDate(currentValue: string | Date | null | undefined) {
    if (!currentValue) {
      return null;
    }

    if (currentValue instanceof Date) {
      return new Date(1970, 0, 1, currentValue.getHours(), currentValue.getMinutes());
    }

    const timeMatch = currentValue.match(/^(\d{1,2}):(\d{2})$/);
    if (!timeMatch) {
      return null;
    }

    const hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2]);
    if (hours > 23 || minutes > 59) {
      return null;
    }

    return new Date(1970, 0, 1, hours, minutes);
  }

  function formatForDisplay(currentValue: string | Date | null | undefined) {
    const timeValue = toTimeDate(currentValue);
    return timeValue ? formatForStorage(timeValue) : '';
  }

  const displayTime = $derived(formatForDisplay(value));
  const selectedTime = $derived(toTimeDate(value));

  onMount(async () => {
    await tick();

    if (!inputElement) {
      return;
    }

    datepicker = new AirDatepicker(inputElement, {
      timepicker: true,
      onlyTimepicker: true,
      timeFormat,
      autoClose: true,
      locale: en,
      container,
      minHours,
      maxHours,
      minMinutes,
      maxMinutes,
      hoursStep,
      minutesStep,
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
      inputElement.value = displayTime;
    }

    if (!datepicker) {
      return;
    }

    if (!selectedTime) {
      datepicker.clear({ silent: true });
      return;
    }

    datepicker.selectDate(selectedTime, { silent: true, updateTime: true });
  });

  onDestroy(() => {
    datepicker?.destroy();
  });
</script>

{#snippet input()}
  <input
    id={name}
    {name}
    class="timeInput"
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
