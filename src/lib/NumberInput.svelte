<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FormState, FieldState } from './Interfaces';
  
  interface Props {
    label?: string;
    value?: number | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    on_change?: any;
    placeholder?: string;
    min?: number | null;
    max?: number | null;
  }

  let {
    label = '',
    value = $bindable(null),
    required = false,
    name = '',
    disabled = false,
    formState = null,
    classes = 'smart-form-input',
    on_change = () => {},
    placeholder = '',
    min = null,
    max = null
  }: Props = $props();
    let fieldState: FieldState = $state();
  </script>
  
  <BaseInput
    label={label}
    required={required}
    classes={classes}
    name={name}
    bind:fieldState={fieldState}
    bind:value={value}
    formState={formState}
  >
    <input
    onblur={() => {fieldState.blur()}}
    onkeyup={on_change}
    required={required}
    disabled="{disabled}"
    placeholder="{placeholder}"
    type="number"
    name="{name}"
    bind:value="{value}"
    min="{min}"
    max="{max}"
    />
  </BaseInput>
  