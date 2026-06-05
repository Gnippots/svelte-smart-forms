<script lang="ts">
  import { tick, type Snippet } from 'svelte';
  import BaseInput from './BaseInput.svelte'; // Assuming BaseInput is in the same directory
  import type { FormState, FieldState } from './Interfaces'; // Assuming Interfaces are defined
  import { createFieldState } from './FieldState.svelte';

  // --- Type Definitions ---
  interface Props {
    label?: string;
    value?: number | null; // The actual numeric value
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
    prefix,
    showValidation = true
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
  let displayValue = $state('');
  let inputElement: HTMLInputElement | undefined = $state();
  // True while the user has typed a lone "-" with no digits yet; suppresses the
  // $effect that would otherwise reformat value→'' and erase the minus sign.
  let isTypingMinus = $state(false);

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

  const parseInput = (str: string) => {
    const negative = str.trimStart().startsWith('-');
    const cleaned = str.replace(/[^0-9]/g, '');
    if (cleaned === '') return 0;
    const num = parseInt(cleaned, 10);
    return negative ? -num : num;
  };

  function clamp(n: number | null): number | null {
    if (n === null) return null;
    let result = n;
    if (min !== null && result < min) result = min;
    if (max !== null && result > max) result = max;
    return result;
  }

  function updateBoundsErrors(n: number | null) {
    if (min !== null && n !== null && n < min) {
      fieldState.addError('min', `Minimum is ${formatNumber(min)}`);
    } else {
      fieldState.removeError('min');
    }
    if (max !== null && n !== null && n > max) {
      fieldState.addError('max', `Maximum is ${formatNumber(max)}`);
    } else {
      fieldState.removeError('max');
    }
  }

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;

    // Mid-type: lone "-" with no digits yet — keep it visible so the user can keep typing.
    if (inputValue.trim() === '-') {
      isTypingMinus = true;
      displayValue = '-';
      value = null;
      updateBoundsErrors(null);
      onChange();
      return;
    }

    isTypingMinus = false;
    const numericValue = parseInput(inputValue);
    displayValue = formatNumber(numericValue);
    value = numericValue;
    updateBoundsErrors(numericValue);
    onChange();
  };

  const handleBlur = () => {
    isTypingMinus = false;
    const clamped = clamp(value);
    if (clamped !== value) {
      value = clamped;
      onChange();
    }
    displayValue = formatNumber(value);
    fieldState.removeError('min');
    fieldState.removeError('max');
  };

  // Checks if the key pressed is allowed
  function handleKeyDown(event: KeyboardEvent) {
    const isDeletion = event.key === 'Backspace' || event.key === 'Delete';
    const isModifier = event.metaKey || event.altKey || event.ctrlKey;
    const isArrowKey = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
    const isTab = event.key === 'Tab';
    const isEnter = event.key === 'Enter';
    const isMinus = event.key === '-';
    // Keys that are not a digit
    const isInvalidCharacter = !/^[0-9]*$/.test(event.key);

    if (
      (!isDeletion && !isModifier && !isArrowKey && isInvalidCharacter && !isTab && !isEnter && !isMinus)
    )
      event.preventDefault();
  }

  // on change ensure input is formatted
  $effect(() => {
    if (isTypingMinus) return;
    displayValue = formatNumber(value);
  });

</script>

<BaseInput
  {label}
  {required}
  {classes}
  {name}
  bind:fieldState={fieldState}
  bind:value={value} 
  {formState}
  {onChange}
  {showValidation}
>
  {#snippet input()}
    <div class="smart-forms-cash-input">
      {@render prefix?.()}

      <input
        bind:this={inputElement}
        type="text"
        inputmode="decimal"
        {name}
        {required}
        {disabled}
        {placeholder}
        value={displayValue} 
        oninput={handleInputChange}
        onkeydown={handleKeyDown}
        onblur={handleBlur}
        aria-label={label || name || 'Currency input'} />
    </div>
  {/snippet}
</BaseInput>

<style>
  /* Basic styling for disabled state */
  input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
  /* Ensure BaseInput's structure allows this flex container */
    /* Adjust pl-7 if needed based on currency symbol width */
</style>