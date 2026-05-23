<script lang="ts">
  import type { Snippet } from 'svelte';
  import TextInput from './TextInput.svelte';
  import type { FormState } from './Interfaces';
  import { createMoneyMask } from './masks';

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
    min = null,
    max = null,
    currencySymbol = '$',
    prefix,
    showValidation = true
  }: Props = $props();

  const moneyMask = $derived(
    createMoneyMask({
      prefixText: prefix ? '' : currencySymbol,
      min,
      max
    })
  );
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
  prefixText={moneyMask.prefixText}
  inputmode={moneyMask.inputmode}
  format={moneyMask.format}
  parse={moneyMask.parse}
  normalizeOnBlur={moneyMask.normalizeOnBlur}
/>