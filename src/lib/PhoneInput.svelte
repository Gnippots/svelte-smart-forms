<script lang="ts">
    import type { FieldState, FormState } from './Interfaces';
    import BaseInput from '$lib/BaseInput.svelte';
    interface Props {
        label?: string;
        value?: string;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        show_validation?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: any;
        on_keyup?: any;
        placeholder?: string;
    }

    let {
        label = '',
        value = $bindable(''),
        required = false,
        name = '',
        disabled = false,
        show_validation = true,
        formState = null,
        classes = 'smart-form-input',
        on_change = () => {},
        on_keyup = () => {},
        placeholder = ''
    }: Props = $props();
    let fieldState: FieldState = $state();
                
</script>

<BaseInput
    label={label}
    classes={classes}
    required={required}
    name={name}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    show_validation={show_validation}
    on_change={on_change}
    validation_functions={[]}
>
    {#snippet input()}
        <input
            
            onblur={() => {fieldState.blur()}}
            required={required}
            onkeyup={on_keyup}
            disabled="{disabled}"
            placeholder="{placeholder}"
            type="text"
            name="{name}"
            bind:value="{value}"
        />
    {/snippet}
</BaseInput>