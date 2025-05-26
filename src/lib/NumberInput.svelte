<script lang="ts">
	import BaseInput from '$lib/BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
	import type { FormState, FieldState } from './Interfaces';

	let {
		label = '',
		value = $bindable(null),
		required = false,
		name = '',
		disabled = false,
		formState,
		classes = 'smart-form-input',
		on_change = () => {},
		placeholder = '',
		min = null,
		max = null
	}: {
		label: string,
		value: number | null,
		required: boolean,
		name: string,
		disabled?: boolean,
		formState: FormState,
		classes?: string,
		on_change?: () => void,
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
		onkeyup={on_change}
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
	{on_change}
	validation_functions={[]}
	input={input}
>
</BaseInput>
