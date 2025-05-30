<script lang="ts">
	import BaseInput from '$lib/BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
	import type { FieldState, FormState } from './Interfaces';
  import AirDatepicker from 'air-datepicker';
  import 'air-datepicker/air-datepicker.css';
  import en from 'air-datepicker/locale/en';
  import { onMount, onDestroy } from 'svelte';

	let {
		label = '',
		value = $bindable(null),
		required = false,
		name = '',
		disabled = false,
		formState,
		classes = 'smart-form-input',
		onChange = () => {},
		placeholder = '',
    showValidation = true,
    container = '',
    dateFormat = 'MMMM, yyyy'
	}: {
		label?: string;
		value?: string | Date | null;
		required?: boolean;
		name?: string;
		disabled?: boolean;
		formState: FormState;
		classes?: string;
		onChange?: any;
		placeholder?: string;
    showValidation?: boolean;
    container?: string;
    dateFormat?: string;
	} = $props();

	let fieldState = $state<FieldState>(createFieldState());

  let datepicker: any;
  let inputElement: HTMLInputElement;

  onMount(() => {
    datepicker = new AirDatepicker(`#${name}`, {
      view: 'months',
      minView: 'months',
      dateFormat: dateFormat,
      locale: en,
      container: container
    });
  });

  onDestroy(() => {
    if (datepicker) {
      datepicker.destroy();
    }
  });

</script>

<BaseInput
	{label}
	{classes}
	{placeholder}
	{required}
	{name}
	{disabled}
	{value}
	bind:fieldState
	{formState}
	{onChange}
	{showValidation}
>
  {#snippet input()}
    <input
      id={name}
      {name}
      class="monthInput"
      placeholder="Choose Date"
      readonly
      {required}
      bind:this={inputElement}
    />
  {/snippet}
</BaseInput>
