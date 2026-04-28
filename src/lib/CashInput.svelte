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
    currencySymbol?: string; 
    prefix?: Snippet;
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
    currencySymbol = '',
    prefix,
    showValidation = true
  }: Props = $props();

  const currencyFormatter = $derived(
    new Intl.NumberFormat(typeof navigator !== 'undefined' ? navigator.language : 'en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  );

  function formatNumber(num: number | null | undefined): string {
    if (num === null || num === undefined || isNaN(num)) {
      return '';
    }

    return currencyFormatter.format(num);
  }

  function normalizeCashValue(currentValue: string | number | null | undefined) {
    if (typeof currentValue === 'number') {
      return currentValue;
    }

    if (currentValue === null || currentValue === undefined || currentValue === '') {
      return null;
    }

    const parsed = Number(currentValue);
    return Number.isNaN(parsed) ? null : parsed;
  }

  function parseInput(str: string) {
    const cleaned = str.replace(/[^0-9]/g, '');
    return cleaned === '' ? 0 : parseInt(cleaned, 10);
  }
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
  {prefix}
  prefixText={prefix ? '' : currencySymbol}
  inputmode="numeric"
  format={(currentValue) => formatNumber(normalizeCashValue(currentValue))}
  parse={(inputValue) => parseInput(inputValue)}
/>