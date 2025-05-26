<script lang="ts">
	import BaseInput from './BaseInput.svelte';
	import type { FormState, FieldState } from './Interfaces';

	interface Props {
		label?: string;
		value?: number | null;
		required?: boolean;
		name?: string;
		disabled?: boolean;
		formState?: FormState | null;
		classes?: string;
		onChange?: any;
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
		onChange = () => {},
		placeholder = '',
		min = null,
		max = null
	}: Props = $props();
	let fieldState: FieldState = $state();
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

<BaseInput {label} {required} {classes} {name} bind:fieldState bind:value {formState} input={input}/>
