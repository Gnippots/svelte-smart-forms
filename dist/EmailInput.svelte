<script lang="ts">
  import BaseInput from './BaseInput.svelte';
  import { createFieldState } from './FieldState.svelte';
  import type { FormState, FieldState } from './Interfaces';
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
    autocomplete = 'off'
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());

  const validateEmail = () => {
    if (value) {
      if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        fieldState.addError('email', 'Invalid Email Address');
      }
    }
  };
</script>

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
    type="email"
    {name}
    bind:value
    autocomplete={autocomplete}
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
  validationFunctions={[validateEmail]}
  input={input}
>
</BaseInput>
  