<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import BaseInput from './BaseInput.svelte'; // Assuming BaseInput is in the same directory
	import type { FormState, FieldState } from './Interfaces'; // Assuming Interfaces are defined

	// --- Type Definitions ---
	interface Props {
		label?: string;
		value?: number | null; // The actual numeric value
		required?: boolean;
		name?: string;
		disabled?: boolean;
		formState?: FormState | null;
		classes?: string;
		on_change?: any; // Callback with the numeric value
		placeholder?: string;
		min?: number | null;
		max?: number | null;
    suffix?: Snippet;
	}

	// --- Props ---
	let {
		label = '',
		value = $bindable(null), // Use $bindable for two-way binding from parent
		required = false,
		name = '',
		disabled = false,
		formState = null,
		classes = 'smart-form-input',
		on_change = () => {},
		placeholder = '',
		min = 0,
		max = 100,
    suffix
	}: Props = $props();

	// --- State ---
	let fieldState: FieldState = $state();
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
    <div class="smart-forms-percentage-input">
      <input
        type="number"
        bind:value
        {name}
        {required}
        {disabled}
        {placeholder}
        {max}
        {min}
        oninput={on_change}
        onblur={() => {
          fieldState.blur();
        }}
        aria-label={label || name || 'Percentage input'} />

        {@render suffix?.()}
    </div>
  {/snippet}
</BaseInput>

<style>
	/* Basic styling for disabled state */
	input:disabled {
		background-color: #f3f4f6;
		cursor: not-allowed;
	}
</style>
