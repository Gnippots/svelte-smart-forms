<script lang="ts">
	import BaseInput from './BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
	import type { FormState, FieldState } from './Interfaces';

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
		max = null
	} : {
		label: string,
		value: number | null,
		required: boolean,
		name: string,
		disabled?: boolean,
		showValidation?: boolean,
		formState: FormState,
		classes?: string,
		onChange?: () => void,
		placeholder?: string,
		min?: number | null,
		max?: number | null
	} = $props();

	let fieldState = $state<FieldState>(createFieldState());

</script>

{#snippet input()}
	<input
		onblur={() => {
			fieldState.blur();
		}}
		onkeyup={onChange}
		{required}
		{disabled}
		{placeholder}
		type="number"
		{name}
		bind:value
		{min}
		{max}
	/>
{/snippet}

<BaseInput
	{label}
	{classes}
	{required}
	{name}
	{value}
	bind:fieldState={fieldState}
	{formState}
	{showValidation}
	{onChange}
	validationFunctions={[]}
	input={input}
>
</BaseInput>
