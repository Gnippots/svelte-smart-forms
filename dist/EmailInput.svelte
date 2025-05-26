<script lang="ts">
    import BaseInput from './BaseInput.svelte';
    import { createFieldState } from './FieldState.svelte';
    import type { FormState, FieldState } from './Interfaces';

    let {
        label = '',
        value = $bindable(''),
        required = false,
        name = '',
        disabled = false,
        showValidation = true,
        formState,
        classes = 'smart-form-input',
        onChange = () => {},
        onKeyup: onKeyup = () => {},
        placeholder = ''
    }: {
        label: string,
        value: string,
        required: boolean,
        name: string,
        disabled?: boolean,
        showValidation?: boolean,
        formState: FormState,
        classes?: string,
        onChange?: () => void,
        onKeyup?: () => void,
        placeholder?: string
    } = $props();

    let fieldState = $state<FieldState>(createFieldState());
  
    let validate_email = () => {
        if (value) {
            if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                fieldState.addError('email', 'Invalid Email Address');
            }
        }
    }
</script>

{#snippet input()}
    <input 
        onblur={() => {
            fieldState.blur();
        }}
        {required}
        onkeyup={onKeyup}
        {disabled}
        {placeholder}
        type="email"
        {name}
        bind:value
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
    validationFunctions={[validate_email]}
    input={input}
>
</BaseInput>
  