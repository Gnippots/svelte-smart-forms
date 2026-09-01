<script lang="ts">
  import type { Snippet } from 'svelte';
  import TextInput from './TextInput.svelte';
  import type { FormState } from './Interfaces';
  import { createPercentageMask } from './masks';

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

  const percentageMask = $derived(createPercentageMask({ suffixText: suffix ? '' : '%', min, max }));
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
  suffixText={percentageMask.suffixText}
  inputmode={percentageMask.inputmode}
  format={percentageMask.format}
  parse={percentageMask.parse}
  normalizeOnBlur={percentageMask.normalizeOnBlur}
/>
