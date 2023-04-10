<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FormValidator, FieldValidator } from './Interfaces';
  
    export let label = '';
    export let value: number | null = null;
    export let required = false;
    export let name = '';
    export let disabled = false;
    export let form_validator: FormValidator | null = null;
    export let classes = 'smart-form-input';
    export let on_change = () => {};
    export let placeholder = '';
    export let min: number | null = null;
    export let max: number | null = null;
    let field_validator: FieldValidator;
  </script>
  
  <BaseInput
    label={label}
    required={required}
    classes={classes}
    name={name}
    bind:field_validator={field_validator}
    bind:value={value}
    form_validator={form_validator}
  >
    <input
    on:blur={() => {field_validator.blur()}}
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
  