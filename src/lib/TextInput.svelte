<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldValidator, FormValidator } from './Interfaces';
  
    export let label: string = '';
    export let value: string = '';
    export let required: boolean = false;
    export let name: string = '';
    export let disabled: boolean = false;
    export let show_validation: boolean = true;
    export let form_validator: FormValidator | null = null;
    export let classes: string = 'smart-form-input';
    export let on_change: () => void = () => {};
    export let on_keyup: () => void = () => {};
    export let placeholder: string = '';
  
    let field_validator: FieldValidator;
  </script>
  
  <BaseInput
    label={label}
    classes={classes}
    required={required}
    name={name}
    bind:value={value}
    bind:field_validator={field_validator}
    form_validator={form_validator}
    show_validation={show_validation}
    on_change={on_change}
    validation_functions={[]}
  >
    <input
      slot="input"
      on:blur={() => {field_validator.blur()}}
      required={required}
      on:keyup={on_keyup}
      disabled="{disabled}"
      placeholder="{placeholder}"
      type="text"
      name="{name}"
      bind:value="{value}"
    />
  </BaseInput>
  