<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
    import type { FieldState, FormState } from './Interfaces';
    interface Props {
        label?: string;
        value?: Date | null;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState: FormState;
        classes?: string;
        onChange?: any;
        placeholder?: string;
    }

    let {
        label = '',
        value = $bindable(null),
        required = false,
        name = '',
        disabled = false,
        formState,
        classes = 'smart-form-input',
        onChange = () => {},
        placeholder = ''
    }: Props = $props();
    let fieldState = $state<FieldState>(createFieldState());
</script>

{#snippet input()}
  <div>
    DatePicker Coming Soon
    <!--<Datepicker/>-->
  </div>
{/snippet}

<BaseInput
    label={label}
    classes={classes}
    placeholder={placeholder}
    required={required}
    name={name}
    disabled={disabled}
    value={value}
    bind:fieldState={fieldState}
    {formState}
    onChange={onChange}
    input={input}
    showValidation={true}
/>