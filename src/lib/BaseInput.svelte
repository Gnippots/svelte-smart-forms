<!-- BaseInput.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import FieldErrors from '$lib/FieldErrors.svelte';
    import type { FormValidator, FieldValidator } from './Interfaces';
  
    export let label = '';
    export let value: any = null;
    export let required = false;
    export let disabled = false;
    export let classes = 'smart-form-input';
    export let name = '';
    export let show_validation = true;
    export let placeholder = '';
    export let form_validator: FormValidator | null = null;
    export let on_change: () => void = () => {};
    export let validation_functions: Array<() => void> = [];
  
    let all_changes = () => {};
  
    export let field_validator: FieldValidator = {
      dirty: false,
      valid: false,
      blurred: false,
      initial_value: null,
      errors: {},
      add_error: (error: string, message: string) => {
        field_validator.valid = false;
        field_validator.errors[error] = message;
      },
      remove_error: (error: string) => {
        delete field_validator.errors[error];
  
        if (Object.keys(field_validator.errors).length === 0) {
          field_validator.valid = true;
        }
      },
      blur: () => {
        field_validator.blurred = true;
      },
    };
  
    function validate(value: any) {
      if (!$form_validator) {
        return;
      }

      // Reset the field validator
      field_validator.errors = {};
      field_validator.valid = true;

      // Check if the field is required
      if (required && (value === null || value === '')) {
        field_validator.add_error('required', 'This is required');
      }

      // Run any validation passed from the level above
      validation_functions.forEach((fn) => {
        fn();
      });

      // update the form validator
      if (field_validator.valid)  {
        delete $form_validator.errors[name];
      } else {
        $form_validator.errors[name] = field_validator.errors;
      }


      $form_validator.fields[name] = field_validator;
    }

  
    $: {
      validate(value);
    }
  
    $: {
      field_validator.dirty = value == field_validator.initial_value;
    }
  
    onMount(async () => {
      if (form_validator) {
        field_validator.initial_value = value;
        $form_validator.fields[name] = field_validator;
      }
  
      all_changes = () => {
        on_change();
      };
    });
  </script>
  
  <div class={classes}>
  <slot name="label">
    {#if label != ''}
      <label for="{name}" class="smart-form-input-label">{label}{#if required}<span ng-if="$ctrl.required" style="color: #ce0262">*</span>{/if}</label>
    {/if}
  </slot>

  <slot name="input">
    <input
      on:keyup={all_changes}
      on:blur={() => {field_validator.blur();}}
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
        form_validator={form_validator}
        field={name}
      ></FieldErrors>
    {/if}
  </slot>
</div>

<style></style>

  