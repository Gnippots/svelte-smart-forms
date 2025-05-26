<script lang="ts">
    import type { FieldState, FormState } from './Interfaces';
    import BaseInput from '$lib/BaseInput.svelte';
    interface Props {
        label?: string;
        value?: string;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        showValidation?: boolean;
        formState?: FormState | null;
        classes?: string;
        onChange?: any;
        onKeyup?: any;
        placeholder?: string;
    }

    let {
        label = '',
        value = $bindable(''),
        required = false,
        name = '',
        disabled = false,
        showValidation = true,
        formState = null,
        classes = 'smart-form-input',
        onChange = () => {},
        onKeyup = () => {},
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
    showValidation={showValidation}
    onChange={onChange}
    validationFunctions={[]}
>
    {#snippet input()}
        <input
            
            onblur={() => {fieldState.blur()}}
            required={required}
            onkeyup={onKeyup}
            disabled="{disabled}"
            placeholder="{placeholder}"
            type="text"
            name="{name}"
            bind:value="{value}"
        />
    {/snippet}
</BaseInput>