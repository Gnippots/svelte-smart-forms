<script lang="ts">
	import { type Snippet } from 'svelte';
	import BaseInput from '$lib/BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
	import type { FormState, FieldState } from './Interfaces';

	interface Props {
		label?: string;
		value?: number | null;
		required?: boolean;
		name?: string;
		disabled?: boolean;
		showValidation?: boolean;
		formState: FormState;
		classes?: string;
		onChange?: () => void;
		placeholder?: string;
		min?: number | null;
		max?: number | null;
		suffix?: Snippet;
	}

	let {
		label = '',
		value = $bindable(null),
		required = false,
		name = '',
		disabled = false,
		showValidation = true,
		formState,
		classes = 'smart-form-input',
		onChange = () => {},
		placeholder = '',
		min = null,
		max = null,
		suffix
	}: Props = $props();

	let fieldState = $state<FieldState>(createFieldState());

	function clamp(n: number | null): number | null {
		if (n === null) return null;
		let result = n;
		if (min !== null && result < min) result = min;
		if (max !== null && result > max) result = max;
		return result;
	}

	function updateBoundsErrors(n: number | null) {
		if (min !== null && n !== null && n < min) {
			fieldState.addError('min', `Minimum is ${min}`);
		} else {
			fieldState.removeError('min');
		}
		if (max !== null && n !== null && n > max) {
			fieldState.addError('max', `Maximum is ${max}`);
		} else {
			fieldState.removeError('max');
		}
	}

	const handleInput = () => {
		updateBoundsErrors(value);
		onChange();
	};

	const handleBlur = () => {
		const clamped = clamp(value);
		if (clamped !== value) value = clamped;
		fieldState.removeError('min');
		fieldState.removeError('max');
		fieldState.blur();
	};
</script>

<BaseInput
	{label}
	{required}
	{classes}
	{name}
	bind:fieldState
	bind:value
	{formState}
	{showValidation}
	{onChange}
>
	{#snippet input()}
		<div class="smart-forms-number-input">
			<input
				type="number"
				bind:value
				{name}
				{required}
				{disabled}
				{placeholder}
				{min}
				{max}
				oninput={handleInput}
				onblur={handleBlur}
				aria-label={label || name || 'Number input'}
			/>
			{@render suffix?.()}
		</div>
	{/snippet}
</BaseInput>

<style>
	input:disabled {
		background-color: #f3f4f6;
		cursor: not-allowed;
	}
</style>
