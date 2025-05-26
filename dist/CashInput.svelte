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
		currencySymbol?: string; // Symbol for currency (e.g., '$', '€')
    prefix?: Snippet;
	}

	// --- Props ---
	let {
		label = '',
		value = $bindable(null), // Use $bindable for two-way binding from parent
		required = false,
		name = '',
		disabled = false,
		formState,
		classes = 'smart-form-input',
		onChange = () => {},
		placeholder = '',
		min = null,
		max = null,
		currencySymbol = '$', // Default currency symbol
    prefix
	}: Props = $props();

	// --- State ---
  let fieldState = $state<FieldState>(createFieldState());
	let displayValue = $state('');
	let inputElement: HTMLInputElement | undefined = $state();

	// --- Formatting ---
	const currencyFormatter = $derived(
		// Use browser's locale for formatting, ensuring 2 decimal places
		new Intl.NumberFormat(typeof navigator !== 'undefined' ? navigator.language : 'en-US', {
			style: 'decimal', // Use 'decimal' to avoid adding currency symbol automatically by Intl
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		})
	);

	function formatNumber(num: number | null | undefined): string {
		if (num === null || num === undefined || isNaN(num)) {
			return ''; // Return empty string for null, undefined, or NaN
		}
		// Use Intl.NumberFormat for currency-like decimal formatting
		return currencyFormatter.format(num);
	}

	// --- Parsing ---
	function parseInput(input: string): number | null {
		if (input === null || input === undefined || input.trim() === '') {
			return null;
		}
		// Remove currency symbol and thousands separators (e.g., ',')
		// This regex handles the symbol safely. Adjust comma removal if locale uses '.' as thousands separator.
		const numString = input
			.replace(new RegExp(`\\${currencySymbol.trim()}`, 'g'), '')
			.replace(/,/g, ''); // Assuming ',' is the thousands separator

		const number = parseFloat(numString);

		if (isNaN(number)) {
			return null; // Return null if parsing fails
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

	// --- Event Handlers ---
	async function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const rawValue = target.value;
		const caretPosition = target.selectionStart; // Store caret position

		const numericValue = parseInput(rawValue);

		// Only update if the numeric value has actually changed
		if (numericValue !== value) {
			value = numericValue; // Update bindable prop
			onChange(numericValue); // Trigger callback
		}

		// Reformat the display value immediately for better UX
		// Use the potentially clamped numericValue for formatting
		displayValue = formatNumber(value);

		// Restore caret position after formatting (important for usability)
		await tick(); // Wait for DOM update
		if (inputElement && caretPosition !== null) {
			// Basic caret restoration - might need refinement if formatting drastically changes length
            try {
			    inputElement.setSelectionRange(caretPosition, caretPosition);
            } catch (e) {
                // Ignore potential errors if element is not focused or selection is not possible
                console.warn("Could not restore caret position.", e);
            }
		}
	}

	function handleBlur() {
		// Ensure the final value is correctly formatted on blur
		const numericValue = parseInput(displayValue); // Parse current display value
		value = numericValue; // Update internal state
		displayValue = formatNumber(numericValue); // Format the final number
		if (value !== numericValue) {
			// If parsing/clamping changed the value on blur, notify parent
			onChange(numericValue);
		}
		fieldState?.blur(); // Notify BaseInput about the blur event
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
        value={displayValue} oninput={handleInput}
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
