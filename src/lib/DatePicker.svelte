<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldState, FormState } from './Interfaces';


    interface Props {
        label?: string;
        value?: Date | null;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
        classes?: string;
        on_change?: any;
        placeholder?: string;
    }

    let {
        label = '',
        value = $bindable(null),
        required = false,
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
    classes={classes}
    placeholder={placeholder}
    required={required}
    name={name}
    disabled={disabled}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    on_change={on_change}

>
{#snippet input()}
        <div >
        DatePicker Coming Soon
        <!--<Datepicker/>-->
    </div>
    {/snippet}
</BaseInput>