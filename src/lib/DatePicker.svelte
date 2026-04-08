<script lang="ts">
	import BaseInput from '$lib/BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
	import type { FieldState, FormState } from './Interfaces';
	import AirDatepicker from 'air-datepicker';
	import 'air-datepicker/air-datepicker.css';
	import en from 'air-datepicker/locale/en';
	import { onMount, onDestroy, tick } from 'svelte';

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
    minDate,
    maxDate
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
    minDate?: Date;
    maxDate?: Date
	} = $props();

	let fieldState = $state<FieldState>(createFieldState());

	let datepicker: any;
	let inputElement: HTMLInputElement;

	onMount(async () => {
    // Await DOM to fully load
    await tick();

    if (inputElement) {
      datepicker = new AirDatepicker(inputElement, {
        view: 'days',
        minView: 'days',
        dateFormat: 'dd/MM/yyyy',
        autoClose: true,
        onSelect({ date, datepicker: adp }) {
          const selectedDate = Array.isArray(date) ? date[0] : date;

          if (selectedDate) {
            // Format the date as YYYY-MM-DD for backend
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            value = `${year}-${month}-${day}`;
          } else {
            value = null;
          }

          adp.hide();
        },
        locale: en,
        container: container,
        minDate: minDate,
        maxDate: maxDate
      });
    }
	});

  $effect(() => {
    if (!datepicker) return;
    
    if (value) {
      const newDate = new Date(value);
      
      // Check if the date is valid
      if (isNaN(newDate.getTime())) {
        console.warn('Unable to convert value', value, 'to Date object');
        return;
      }
      
      const currentPickerDate = datepicker.selectedDates[0];

      if (!currentPickerDate || newDate.getTime() !== currentPickerDate.getTime()) {
        datepicker.selectDate(newDate, { silent: true });
      }
    } else {
      datepicker.clear({ silent: true });
    }
  });

	onDestroy(() => {
		if (datepicker) {
			datepicker.destroy();
		}
	});
</script>

{#snippet input()}
  <div>
    DatePicker Coming Soon
    <!--<Datepicker/>-->
  </div>
{/snippet}

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
			class="dateInput" 
			placeholder="Choose Date"
			readonly
			{required}
			bind:this={inputElement}
		/>
	{/snippet}
</BaseInput>