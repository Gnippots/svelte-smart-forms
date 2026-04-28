<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
  import { createFieldState } from './FieldState.svelte';
  import type { FormState, FieldState } from './Interfaces';
  import type { FullAutoFill } from 'svelte/elements';

  type DropdownOption = string | { value: string; name: string; disabled?: boolean };
  type NormalizedOption = { value: string; name: string; disabled: boolean };

  interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    options?: Array<DropdownOption>;
    optionGroups?: Array<{ label: string; options: Array<DropdownOption> }>;
    onChange?: () => void;
    placeholder?: string;
    onBlur?: () => void;
    showValidation?: boolean;
    autocomplete?: FullAutoFill;
  }

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
    showValidation = true,
    autocomplete = 'off'
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());

  function normalizeOptions(unformattedOptions: Array<DropdownOption>): Array<NormalizedOption> {
    return unformattedOptions.map((option) => {
      if (typeof option === 'string') {
        return { value: option, name: option, disabled: false };
      }

      return {
        value: option.value,
        name: option.name,
        disabled: option.disabled === true
      };
    });
  }

  const formattedOptions = $derived(normalizeOptions(options));
  const formattedOptionGroups = $derived(
    optionGroups.map((group) => ({
      label: group.label,
      options: normalizeOptions(group.options)
    }))
  );
</script>

{#snippet input()}
  <div style="margin-bottom: 4px;">
    <select
      {required}
      {disabled}
      {name}
      bind:value
      onblur={() => {
        fieldState.blur();
        onBlur();
      }}
      onchange={onChange}
      autocomplete={autocomplete}
    >
      {#if placeholder}
        <option value="" disabled={required}>{placeholder}</option>
      {/if}

      {#each formattedOptionGroups as group}
        <optgroup label={group.label}>
          {#each group.options as option}
            <option value={option.value} disabled={option.disabled}>{option.name}</option>
          {/each}
        </optgroup>
      {/each}

      {#each formattedOptions as option}
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