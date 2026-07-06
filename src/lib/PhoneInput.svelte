<script lang="ts">
  import type { FieldState, FormState } from './Interfaces';
  import BaseInput from '$lib/BaseInput.svelte';
  import { createFieldState } from './FieldState.svelte';
  import type { FullAutoFill } from 'svelte/elements';

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
    autocomplete?: FullAutoFill;
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
    placeholder = '',
    autocomplete = 'tel',
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
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
>
  {#snippet input()}
    <input
      oninput={onChange}
      onblur={() => {
        fieldState.blur();
      }}
      {required}
      onkeyup={onKeyup}
      {disabled}
      {placeholder}
      type="text"
      {name}
      bind:value
      autocomplete={autocomplete}
    />
  {/snippet}
</BaseInput>