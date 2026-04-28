<script lang="ts">
  import type { Snippet } from 'svelte';
  import TextInput from './TextInput.svelte';
  import type { FormState } from './Interfaces';

  interface Props {
    label?: string;
    value?: number | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    placeholder?: string;
    min?: number | null;
    max?: number | null;
    suffix?: Snippet;
    showValidation?: boolean;
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
    placeholder = '',
    min = 0,
    max = 100,
    suffix,
    showValidation = true
  }: Props = $props();

  function parsePercentage(inputValue: string) {
    const cleaned = inputValue.replace(/[^0-9.-]/g, '');

    if (cleaned === '' || cleaned === '-' || cleaned === '.') {
      return null;
    }

    const parsed = Number(cleaned);
    if (Number.isNaN(parsed)) {
      return value;
    }

    return parsed;
  }

  function clampPercentage(currentValue: string | number | null | undefined) {
    if (currentValue === null || currentValue === undefined || currentValue === '') {
      return null;
    }

    const parsed = typeof currentValue === 'number' ? currentValue : Number(currentValue);
    if (Number.isNaN(parsed)) {
      return value;
    }

    if (min !== null && parsed < min) {
      return min;
    }

    if (max !== null && parsed > max) {
      return max;
    }

    return parsed;
  }
</script>

<TextInput
  {label}
  {required}
  {classes}
  {name}
  bind:value
  {formState}
  {disabled}
  {onChange}
  {placeholder}
  {showValidation}
  {suffix}
  suffixText={suffix ? '' : '%'}
  inputmode="decimal"
  format={(currentValue) => (currentValue === null || currentValue === undefined ? '' : String(currentValue))}
  parse={(inputValue) => parsePercentage(inputValue)}
  normalizeOnBlur={clampPercentage}
/>
