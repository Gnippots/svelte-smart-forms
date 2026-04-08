<script lang="ts">
	import { type Snippet } from 'svelte';
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
		onChange?: any; // Callback with the numeric value
		placeholder?: string;
		min?: number | null;
		max?: number | null;
    suffix?: Snippet;
    showValidation?: boolean;
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
		min = 0,
		max = 100,
    suffix,
    showValidation = true
	}: Props = $props();

	// --- State ---
  let fieldState = $state<FieldState>(createFieldState());
</script>

<BaseInput
	{label}
	{required}
	{classes}
	{name}
	bind:fieldState={fieldState}
	bind:value={value}
  {formState}
  {showValidation}
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
        oninput={onChange}
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
