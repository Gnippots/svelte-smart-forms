<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
  import type { FieldState, FormState } from './Interfaces';

  interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    show_validation?: boolean;
    formState?: FormState | null;
    classes?: string;
    on_change?: () => void;
    on_keyup?: () => void;
    placeholder?: string;
  }

  let {
    label = '',
    value = $bindable(''),
    required = false,
    name = '',
    disabled = false,
    show_validation = true,
    formState = null,
    classes = 'smart-form-input',
    on_change = () => {},
    on_keyup = () => {},
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
  {show_validation}
  {on_change}
  validation_functions={[]}
>
  {#snippet input()}
    <input
      onblur={() => {
        fieldState?.blur();
      }}
      {required}
      onkeyup={on_keyup}
      {disabled}
      {placeholder}
      type="text"
      {name}
      bind:value
    />
  {/snippet}
</BaseInput>
