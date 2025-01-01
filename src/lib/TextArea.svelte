<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldState, FormState } from './Interfaces';
    interface Props {
        label?: string;
        value?: string;
        required?: boolean;
        rows?: number;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: any;
        placeholder?: string;
    }

    let {
        label = '',
        value = $bindable(''),
        required = false,
        rows = 4,
        name = '',
        disabled = false,
        formState = null,
        classes = 'smart-form-input',
        on_change = () => {},
        placeholder = ''
    }: Props = $props();
    let fieldState: FieldState = $state();
                
</script>

<BaseInput
    label={label}
    required={required}
    name={name}
    classes={classes}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    on_change={on_change}

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