<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
  import { createFieldState } from './FieldState.svelte';
  import type { FieldState, FormState } from './Interfaces';

  interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    rows?: number;
    name?: string;
    disabled?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    placeholder?: string;
    showValidation?: boolean;
  }

  let {
    label = '',
    value = $bindable(''),
    required = false,
    rows = 4,
    name = '',
    disabled = false,
    formState,
    classes = 'smart-form-input',
    onChange = () => {},
    placeholder = '',
    showValidation = true
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
</script>

<BaseInput
  {label}
  {required}
  {name}
  {classes}
  bind:value
  bind:fieldState
  {formState}
  {onChange}
  {showValidation}
>
  {#snippet input()}
    <textarea
      style="height: auto;"
      oninput={onChange}
      onblur={() => {
        fieldState.blur();
      }}
      {rows}
      {required}
      bind:value
      {disabled}
      {placeholder}
      {name}
    ></textarea>
  {/snippet}
</BaseInput>