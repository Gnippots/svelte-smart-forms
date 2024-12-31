<script lang="ts">
    import BaseInput from '$lib/BaseInput.svelte';
    import type { FieldState, FormState } from './Interfaces';
  
    export let label: string = '';
    export let value: string = '';
    export let required: boolean = false;
    export let name: string = '';
    export let disabled: boolean = false;
    export let show_validation: boolean = true;
    export let formState: FormState | null = null;
    export let classes: string = 'smart-form-input';
    export let on_change: () => void = () => {};
    export let on_keyup: () => void = () => {};
    export let placeholder: string = '';
  
    let fieldState: FieldState;
  </script>
  
  <BaseInput
    label={label}
    classes={classes}
    required={required}
    name={name}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    show_validation={show_validation}
    on_change={on_change}
    validation_functions={[]}
  >
    <input
      slot="input"
      on:blur={() => {fieldState.blur()}}
      required={required}
      on:keyup={on_keyup}
      disabled="{disabled}"
      placeholder="{placeholder}"
      type="text"
      name="{name}"
      bind:value="{value}"
    />
  </BaseInput>
  