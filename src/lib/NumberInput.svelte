<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FormState, FieldState } from './Interfaces';
  
    export let label = '';
    export let value: number | null = null;
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let formState: FormState | null = null;
    export let classes = 'smart-form-input';
    export let on_change = () => {};
    export let placeholder = '';
    export let min: number | null = null;
    export let max: number | null = null;
    let fieldState: FieldState;
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
    on:blur={() => {fieldState.blur()}}
    on:keyup={on_change}
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
  