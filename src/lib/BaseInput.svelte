<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<!-- BaseInput.svelte -->
<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import FieldErrors from '$lib/FieldErrors.svelte';
    import type { FormState, FieldState } from './Interfaces';

    let {
      label = '', 
      value = $bindable(), 
      required = false, 
      disabled = false, 
      classes = 'smart-form-input', 
      name = '', 
      showValidation = false, 
      placeholder = '', 
      formState, 
      onChange = () => {}, 
      validationFunctions = [], 
      fieldState = $bindable(),
      input
    } : {
      label: string, 
      value: any, 
      required: boolean, 
      disabled?: boolean, 
      classes: string, 
      name: string, 
      showValidation?: boolean, 
      placeholder?: string, 
      formState: FormState, 
      onChange?: () => void, 
      validationFunctions?: Array<() => void>, 
      fieldState: FieldState,
      input?: Snippet
    } = $props();

    let all_changes = $state(() => {});
    let initial_value = $state(value);
    let isDirty = $derived(value !== initial_value);
    let previousValue = $state(value);
  
    function validate(value: any) {
      if (!$formState) {
        return;
      }

      // Reset the field formState
      fieldState.errors = {};
      fieldState.valid = true;

      // Check if the field is required
      if (required && (value === null || value === '' || value === false)) {
        fieldState.addError('required', 'This is required');
      }
      // Run any validation passed from the level above
      validationFunctions.forEach((fn: () => void) => {
        fn();
      });

      // update the form error state
      if (fieldState.valid)  {
        delete $formState.errors[name];
      } else {
        $formState.errors[name] = fieldState.errors;
        $formState.valid = false; // Added by Bailey - if field has an error then form is invalid
      }

      $formState.fields[name] = fieldState;
    }

    // Run validation on mount and when value changes
    $effect(() => {
      if (value !== previousValue) {
        validate(value);
        previousValue = value;
      }
    });
  
    onMount(async () => {
      if ($formState) {
        fieldState.initialValue = value;
        fieldState.isDirty = isDirty;
        $formState.fields[name] = fieldState;

        // Run initial validation
        validate(value);
      }
  
      all_changes = () => {
        onChange();
      };
    });
  </script>
  
  <div class={classes}>

    {#if label != ''}
      <label for="{name}" class="smart-form-input-label">{label}{#if required}<span style="color: #ce0262">*</span>{/if}</label>
    {/if}

    {#if input}
      {@render input()}
    {:else}
      <input
        onkeyup={all_changes}
        onblur={() => {fieldState.blur();}}
        required={required}
        disabled="{disabled}"
        placeholder="{placeholder}"
        type='text'
        name={name}
        bind:value={value}
      />
    {/if}

    {#if showValidation }
      <FieldErrors
        formState={formState}
        field={name}
      ></FieldErrors>
    {/if}
</div>

<style></style>

  