<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
	import { createFieldState } from './FieldState.svelte';
  import type { FieldState, FormState } from './Interfaces';

  interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
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
    formState,
    classes = 'smart-form-input',
    onChange = () => {},
    onKeyup = () => {},
    placeholder = ''
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());

</script>

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
