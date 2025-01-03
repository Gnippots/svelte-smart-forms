<script lang="ts">
    import BaseInput from './BaseInput.svelte';
    import type { FormState } from './Interfaces';
  
  interface Props {
    label?: string;
    value?: string | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    options?: Array<string | { value: string; name: string; disabled?: boolean }>;
    option_groups?: Array<{ label: string; options: Array<string | { value: string; name: string; disabled?: boolean }> }>;
    on_change?: any;
    placeholder?: string;
    on_blur?: any;
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
    option_groups = [],
    on_change = () => {},
    placeholder = '',
    on_blur = () => {}
  }: Props = $props();
  
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
  
  <BaseInput
    label={label}
    required={required}
    name={name}
    bind:value={value}
    formState={formState}
    classes={classes}
    on_change={on_change}
  >
    {#snippet input()}
    <div style="margin-bottom: 4px;" >
        <select
          style="padding: .1rem"
          required={required}
          disabled={disabled}
          name={name}
          bind:value={value}
          onblur={on_blur}
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
  </BaseInput>
  