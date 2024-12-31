<!-- BaseInput.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import FieldErrors from '$lib/FieldErrors.svelte';
    import type { FormState, FieldState } from './Interfaces';
  
    export let label = '';
    export let value: any = null;
    export let required = false;
    export let disabled = false;
    export let classes = 'smart-form-input';
    export let name = '';
    export let show_validation = true;
    export let placeholder = '';
    export let formState: FormState | null = null;
    export let on_change: () => void = () => {};
    export let validation_functions: Array<() => void> = [];
  
    let all_changes = () => {};
  
    export let fieldState: FieldState = {
      dirty: false,
      valid: false,
      blurred: false,
      initial_value: null,
      errors: {},
      add_error: (error: string, message: string) => {
        fieldState.valid = false;
        fieldState.errors[error] = message;
      },
      remove_error: (error: string) => {
        delete fieldState.errors[error];
  
        if (Object.keys(fieldState.errors).length === 0) {
          fieldState.valid = true;
        }
      },
      blur: () => {
        fieldState.blurred = true;
      },
    };
  
    function validate(value: any) {
      if (!$formState) {
        return;
      }

      // Reset the field formState
      fieldState.errors = {};
      fieldState.valid = true;

      // Check if the field is required
      if (required && (value === null || value === '' || value === false)) {
        fieldState.add_error('required', 'This is required');
      }

      // Run any validation passed from the level above
      validation_functions.forEach((fn) => {
        fn();
      });

      // update the form error state
      if (fieldState.valid)  {
        delete $formState.errors[name];
      } else {
        $formState.errors[name] = fieldState.errors;
      }


      $formState.fields[name] = fieldState;
    }

  
    $: {
      validate(value);
    }
  
    $: {
      fieldState.dirty = value === fieldState.initial_value;
    }
  
    onMount(async () => {
      if ($formState) {
        fieldState.initial_value = value;
        $formState.fields[name] = fieldState;
      }
  
      all_changes = () => {
        on_change();
      };
    });
  </script>
  
  <div class={classes}>
  <slot name="label">
    {#if label != ''}
      <label for="{name}" class="smart-form-input-label">{label}{#if required}<span style="color: #ce0262">*</span>{/if}</label>
    {/if}
  </slot>

  <slot name="input">
    <input
      on:keyup={all_changes}
      on:blur={() => {fieldState.blur();}}
      required={required}
      disabled="{disabled}"
      placeholder="{placeholder}"
      type='text'
      name={name}
      bind:value={value}
    />
  </slot>

  <slot name="errors">
    {#if show_validation }
      <FieldErrors
        formState={formState}
        field={name}
      ></FieldErrors>
    {/if}
  </slot>
</div>

<style></style>

  