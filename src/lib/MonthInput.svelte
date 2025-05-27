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
    container = ''
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
	} = $props();

	let fieldState = $state<FieldState>(createFieldState());

  let datepicker: any;
  let inputElement: HTMLInputElement;

  function formatDate(date: Date | string | null) {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  $effect(() => {
    inputElement.value = formatDate(value);
  });

  onMount(() => {
    datepicker = new AirDatepicker(`#${name}`, {
      view: 'months',
      minView: 'months',
      dateFormat: 'yyyy-MM',
      onSelect({ date }) {
        const selectedDate = Array.isArray(date) ? date[0] : date;
        // Format the date to match backend
        // line 404 backend/src/services/waterfall.py can't handle normal dates
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        value = `${year}-${month}`; // Format as YYYY-MM-01 as thats what backend expects for months
      },
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
