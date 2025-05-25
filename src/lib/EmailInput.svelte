<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import { createFieldState } from './FieldState.svelte';
    import type { FormState, FieldState } from './Interfaces';

    let {
        label = '',
        value = $bindable(''),
        required = false,
        name = '',
        disabled = false,
        show_validation = true,
        formState,
        classes = 'smart-form-input',
        on_change = () => {},
        on_keyup = () => {},
        placeholder = ''
    }: {
        label: string,
        value: string,
        required: boolean,
        name: string,
        disabled?: boolean,
        show_validation: boolean,
        formState: FormState,
        classes: string,
        on_change: () => void,
        on_keyup: () => void,
        placeholder?: string
    } = $props();

    let fieldState = $state<FieldState>(createFieldState());
  
    let validate_email = () => {
        if (value) {
            if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                fieldState.add_error('email', 'Invalid Email Address');
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
        onkeyup={on_keyup}
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
    {fieldState}
    {formState}
    {show_validation}
    {on_change}
    validation_functions={[validate_email]}
    input={input}
>
</BaseInput>
  