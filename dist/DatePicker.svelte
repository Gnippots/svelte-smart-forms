<script lang="ts">
    import BaseInput from './BaseInput.svelte';
    import type { FieldState, FormState } from './Interfaces';


    interface Props {
        label?: string;
        value?: Date | null;
        required?: boolean;
        name?: string;
        disabled?: boolean;
        formState?: FormState | null;
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
        formState = null,
        classes = 'smart-form-input',
        onChange = () => {},
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
    onChange={onChange}

>
{#snippet input()}
        <div >
        DatePicker Coming Soon
        <!--<Datepicker/>-->
    </div>
    {/snippet}
</BaseInput>