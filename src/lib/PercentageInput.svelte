<script lang="ts">
	import { type Snippet } from 'svelte';
	import NumberInput from './NumberInput.svelte';
	import type { FormState } from './Interfaces';

	interface Props {
		label?: string;
		value?: number | null;
		required?: boolean;
		name?: string;
		disabled?: boolean;
		formState: FormState;
		classes?: string;
		onChange?: () => void;
		placeholder?: string;
		min?: number | null;
		max?: number | null;
		suffix?: Snippet;
		showValidation?: boolean;
	}

	let {
		value = $bindable(null),
		min = 0,
		max = 100,
		suffix,
		...rest
	}: Props = $props();
</script>

<NumberInput bind:value {min} {max} {suffix} {...rest} />
