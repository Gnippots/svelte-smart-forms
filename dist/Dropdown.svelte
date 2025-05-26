<script lang="ts">
    import BaseInput from './BaseInput.svelte';
    import type { FormState } from './Interfaces';
  
  interface Props {
    label?: string;
    value?: any;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    options?: Array<string | { value: any; name: string; disabled?: boolean }>;
    optionGroups?: Array<{ label: string; options: Array<string | { value: string; name: string; disabled?: boolean }> }>;
    onChange?: any;
    placeholder?: string;
    onBlur?: any;
  }

  let {
    label = '',
    value = $bindable(''),
    required = false,
    name = '',
    disabled = false,
    formState = null,
    classes = 'smart-form-input',
    options = [],
    optionGroups = [],
    onChange = () => {},
    placeholder = '',
    onBlur = () => {}
  }: Props = $props();
  
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
  
  <BaseInput
    label={label}
    required={required}
    name={name}
    bind:value={value}
    formState={formState}
    classes={classes}
    onChange={onChange}
  >
    {#snippet input()}
    <div style="margin-bottom: 4px;" >
        <select
          required={required}
          disabled={disabled}
          name={name}
          bind:value={value}
          onblur={onBlur}
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
  </BaseInput>
  