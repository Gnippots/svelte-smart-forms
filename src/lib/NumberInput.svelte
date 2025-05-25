<script lang="ts">
	import BaseInput from '$lib/BaseInput.svelte';
	import type { FormState, FieldState } from './Interfaces';

	interface Props {
		label?: string;
		value?: number | null;
		required?: boolean;
		name?: string;
		disabled?: boolean;
		formState?: FormState | null;
		classes?: string;
		on_change?: any;
		placeholder?: string;
		min?: number | null;
		max?: number | null;
	}

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
		max = null
	}: Props = $props();
	let fieldState: FieldState = $state();
</script>

<BaseInput {label} {required} {classes} {name} bind:fieldState bind:value {formState}>
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
</BaseInput>
