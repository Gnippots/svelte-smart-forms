<script lang="ts">
    import BaseInput from './BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
    import type { FieldState, FormState } from './Interfaces';
    interface Props {
        label?: string;
        value?: string;
        required?: boolean;
        rows?: number;
        name?: string;
        disabled?: boolean;
        formState: FormState;
        classes?: string;
        onChange?: any;
        placeholder?: string;
        showValidation?: boolean;
    }

    let {
        label = '',
        value = $bindable(''),
        required = false,
        rows = 4,
        name = '',
        disabled = false,
        formState,
        classes = 'smart-form-input',
        onChange = () => {},
        placeholder = '',
        showValidation = true
    }: Props = $props();
  let fieldState = $state<FieldState>(createFieldState());
                
</script>

<BaseInput
    label={label}
    required={required}
    name={name}
    classes={classes}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    onChange={onChange}
    {showValidation}
>
    {#snippet input()}
        <textarea
            
            style="height: auto;"
            onblur={() => {fieldState.blur()}}
            rows={rows}
            required={required}
            bind:value={value}
            disabled={disabled}
            placeholder={placeholder}
            name={name}
            
        ></textarea>
    {/snippet}
</BaseInput>