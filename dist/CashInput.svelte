<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import BaseInput from './BaseInput.svelte'; // Assuming BaseInput is in the same directory
	import type { FormState, FieldState } from './Interfaces'; // Assuming Interfaces are defined

	let {
		label = '',
		value = $bindable(null), 
		required = false,
		name = '',
		disabled = false,
		formState = null,
		classes = 'smart-form-input',
		on_change = () => {},
		placeholder = '',
		min = null,
		max = null,
		currencySymbol = '$',
    prefix
	}: {
		label?: string;
		value?: number | null;
		required?: boolean;
		name?: string;
		disabled?: boolean;
		formState?: FormState | null;
		classes?: string;
		on_change?: (value: number | null) => void;
		placeholder?: string;
		min?: number | null;
		max?: number | null;
		currencySymbol?: string;
    prefix?: Snippet;
	} = $props();

	let fieldState: FieldState = $state();
	let displayValue = $state('');
	let inputElement: HTMLInputElement | undefined = $state();

	const currencyFormatter = $derived(
		// Use browser's locale for formatting, ensuring 2 decimal places
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

  // Parses the input field and removes currency formatting and convert to a number
	function parseInput(input: string): number | null {
		if (input === null || input === undefined || input.trim() === '') {
			return null;
		}
		// Remove currency symbol and thousands separators (e.g., ',')
		// This regex handles the symbol safely. Adjust comma removal if locale uses '.' as thousands separator.
		const numString = input
			.replace(new RegExp(`\\${currencySymbol.trim()}`, 'g'), '')
			.replace(/,/g, '');

		const number = parseFloat(numString);

		if (isNaN(number)) {
			return null; 
		}

		// Clamp value between min and max if they are set
		let clampedNumber = number;
		if (min !== null && clampedNumber < min) {
			clampedNumber = min;
		}
		if (max !== null && clampedNumber > max) {
			clampedNumber = max;
		}

		return clampedNumber;
	}

	async function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const rawValue = target.value;
		const caretPosition = target.selectionStart;

		const numericValue = parseInput(rawValue);

		// Only update if the numeric value has actually changed
		if (numericValue !== value) {
			value = numericValue;
			on_change(numericValue); 
		}

		displayValue = formatNumber(value);

		// Restore caret position after formatting (important for usability)
		await tick();
		if (inputElement && caretPosition !== null) {
      try {
        inputElement.setSelectionRange(caretPosition, caretPosition);
      } catch (e) {
        console.warn("Could not restore caret position.", e);
      }
		}
	}

	function handleBlur() {
		// Ensure the final value is correctly formatted on blur
		const numericValue = parseInput(displayValue);
		value = numericValue;
		displayValue = formatNumber(numericValue);
		if (value !== numericValue) {
			on_change(numericValue);
		}
		fieldState?.blur();
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
	bind:value={value} {formState}
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
        value={displayValue} oninput={handleInput}
        onblur={handleBlur}
        aria-label={label || name || 'Currency input'} />
    </div>
  {/snippet}
</BaseInput>

<style>
	input:disabled {
		background-color: #f3f4f6;
		cursor: not-allowed;
	}
</style>
