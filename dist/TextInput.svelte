<script lang="ts">
  import BaseInput from './BaseInput.svelte';
  import type { FieldState, FormState } from './Interfaces';

  interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState?: FormState | null;
    classes?: string;
    onChange?: () => void;
    onKeyup?: () => void;
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

  let fieldState = $state<FieldState>();
</script>

<BaseInput
  {label}
  {classes}
  {required}
  {name}
  bind:value
  bind:fieldState
  {formState}
  {showValidation}
  {onChange}
  validationFunctions={[]}
>
  {#snippet input()}
    <input
      onblur={() => {
        fieldState?.blur();
      }}
      {required}
      onkeyup={onKeyup}
      {disabled}
      {placeholder}
      type="text"
      {name}
      bind:value
    />
  {/snippet}
</BaseInput>
