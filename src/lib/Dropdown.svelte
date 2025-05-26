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
        formState,
        classes = 'smart-form-input',
        options = [],
        optionGroups = [],
        onChange = () => {},
        placeholder = '',
        onBlur = () => {},
        showValidation = true
    }: {
        label: string,
        value: any,
        required: boolean,
        name: string,
        disabled?: boolean,
        formState: FormState,
        classes?: string,
        options?: Array<string | { value: any; name: string; disabled?: boolean }>,
        optionGroups?: Array<{ label: string; options: Array<string | { value: string; name: string; disabled?: boolean }> }>,
        onChange?: () => void,
        placeholder?: string,
        onBlur?: () => void,
        showValidation?: boolean
    } = $props();
  
    let fieldState = $state<FieldState>(createFieldState());
    let formatted_options: Array<{ value: string; name: string; disabled: boolean }> = $state([]);
    let formatted_optionGroups: Array<{ label: string; options: Array<{ value: string; name: string; disabled: boolean }> }> = [];
  
    function format_options(unformatted_options: Array<string | { value: string; name: string; disabled?: boolean }>) {
        unformatted_options.forEach((option, index) => {
            if (typeof option == 'string') {
                formatted_options.push({ 'value': option, 'name': option, 'disabled': false });
            } else {
                option.disabled = option.disabled == true;
                formatted_options.push({ 'value': option.value, 'name': option.name, 'disabled': option.disabled } as { value: string; name: string; disabled: boolean });
            }
        });
        return formatted_options;
    }

    if (optionGroups.length > 0) {
        optionGroups.forEach(o => {
            formatted_optionGroups.push({
                'label': o.label,
                'options': format_options(o.options)
            })
        })
    } else {
        formatted_options = format_options(options);
    }
</script>

{#snippet input()}
    <div style="margin-bottom: 4px;">
        <select
            required={required}
            disabled={disabled}
            name={name}
            bind:value
            onblur={() => {
                fieldState.blur();
                onBlur();
            }}
            onchange={onChange}
        >
            {#if placeholder}
                <option value={value}>{placeholder}</option>
            {/if}
    
            {#each formatted_optionGroups as group}
                <optgroup label={group.label}>
                    {#each group.options as option}
                        <option value={option.value}>{option.name}</option>
                    {/each}
                </optgroup>
            {/each}
    
            {#each formatted_options as option}
                <option value={option.value} disabled={option.disabled}>{option.name}</option>
            {/each}
        </select>
    </div>
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
    validationFunctions={[]}
    input={input}
>
</BaseInput>
  