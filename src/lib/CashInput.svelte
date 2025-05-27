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
    onChange?: (value: number | null) => void; // Callback with the numeric value
    placeholder?: string;
    min?: number | null;
    max?: number | null;
    currencySymbol?: string; 
    prefix?: Snippet;
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
    prefix
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
  let displayValue = $state('');
  let inputElement: HTMLInputElement | undefined = $state();

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
    const cleaned = str.replace(/[^0-9]/g, '');
    return cleaned === '' ? 0 : parseInt(cleaned, 10);
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;
    
    const numericValue = parseInput(inputValue);
    
    displayValue = formatNumber(numericValue);;
    
    value = numericValue;
  };

  const handleBlur = () => {
    displayValue = formatNumber(value);
  };

  // Checks if the key pressed is allowed
  function handleKeyDown(event: KeyboardEvent) {
    const isDeletion = event.key === 'Backspace' || event.key === 'Delete';
    const isModifier = event.metaKey || event.altKey || event.ctrlKey;
    const isArrowKey = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
    const isTab = event.key === 'Tab';
    const isEnter = event.key === 'Enter';
    // Keys that are not a digit
    const isInvalidCharacter = !/^[0-9]*$/.test(event.key);

    if (
      (!isDeletion && !isModifier && !isArrowKey && isInvalidCharacter && !isTab && !isEnter)
    )
      event.preventDefault();
  }

  // on change ensure input is formatted
  $effect(() => {
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