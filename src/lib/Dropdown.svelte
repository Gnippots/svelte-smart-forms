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
        option_groups = [],
        on_change = () => {},
        placeholder = '',
        on_blur = () => {}
    }: {
        label: string,
        value: any,
        required: boolean,
        name: string,
        disabled?: boolean,
        formState: FormState,
        classes: string,
        options: Array<string | { value: any; name: string; disabled?: boolean }>,
        option_groups: Array<{ label: string; options: Array<string | { value: string; name: string; disabled?: boolean }> }>,
        on_change: () => void,
        placeholder?: string,
        on_blur: () => void
    } = $props();
  
    let fieldState = $state<FieldState>(createFieldState());
    let formatted_options: Array<{ value: string; name: string; disabled: boolean }> = $state([]);
    let formatted_option_groups: Array<{ label: string; options: Array<{ value: string; name: string; disabled: boolean }> }> = [];
  
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

    if (option_groups.length > 0) {
        option_groups.forEach(o => {
            formatted_option_groups.push({
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
                on_blur();
            }}
            onchange={on_change}
        >
            {#if placeholder}
                <option value={value}>{placeholder}</option>
            {/if}
    
            {#each formatted_option_groups as group}
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
    {fieldState}
    {formState}
    {on_change}
    validation_functions={[]}
    input={input}
>
</BaseInput>
  