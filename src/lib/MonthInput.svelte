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

  console.log(value);
  

  function formatDate(date: Date | string | null) {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  function convertToMonthCommaYear(inputDate: string | Date | null) {
    if (!inputDate) return '';
    let dateObj;

    if (typeof inputDate === 'string') {
      // Handle "YYYY-MM" string input
      const parts = inputDate.split('-');

      const yearString = parts[0].trim();
      const monthString = parts[1].trim();

      const year = parseInt(yearString, 10);
      const month = parseInt(monthString, 10);


      // Create a Date object. Month is 0-indexed for Date constructor.
      dateObj = new Date(year, month - 1, 1);
    } else {
      dateObj = inputDate
    }

    // Get the short month name (e.g., "Jan", "Feb")
    const shortMonthName = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();

    return `${shortMonthName}, ${year}`;
  }

  $effect(() => {
    inputElement.value = convertToMonthCommaYear(value);
  });

  onMount(() => {
    datepicker = new AirDatepicker(`#${name}`, {
      view: 'months',
      minView: 'months',
      dateFormat:'MMM-yyyy',
      onSelect({ date }) {
        console.log(date);
        
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