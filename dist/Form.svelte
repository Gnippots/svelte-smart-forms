<script lang="ts">
  // $effect and $state are globally available in Svelte 5 runes mode
  import type { FormState as FormStoreType, FormStateStore as FormStoreValueType } from './Interfaces';

  interface Props {
    formState: FormStoreType | null; // This is the Svelte store
    onSubmit?: (() => void) | null;
    children?: import('svelte').Snippet;
    id?: string | null;
  }

  let { formState = null, onSubmit = null, children, id = null }: Props = $props();

  // Local reactive state to hold the current value from the formState store.
  let currentStoreValue = $state<FormStoreValueType | null>(null);

  // Effect to subscribe to the formState store prop and update currentStoreValue.
  $effect(() => {
    if (formState) {
      // Subscribe to the external store.
      // When the store's value changes, update our local reactive $state variable.
      const unsubscribe = formState.subscribe(value => {
        currentStoreValue = value;
      });
      // Cleanup: Svelte will call this function when the effect re-runs or the component is destroyed.
      return unsubscribe;
    } else {
      // If formState prop is null, set our local state to null.
      currentStoreValue = null;
    }
  });

  /**
   * Validates the form.
   * 1. Updates the store's 'valid' status based on its 'fields'.
   * 2. Executes customRules, which are expected to perform their own store updates if they affect validity.
   */
  const validate = () => {
    if (!formState) { // Check if the store prop itself is null
        return;
    }

    // Step 1: Update the store based on field validity.
    // This provides an initial 'valid' state for custom rules to potentially act upon.
    formState.update(s => {
      if (!s) return s; // Should not happen if formState is not null and store is initialized
      let fieldsAreValid = true;
      if (s.fields) {
        for (const [, field] of Object.entries(s.fields)) {
          if (!field.valid) {
            fieldsAreValid = false;
            break;
          }
        }
      }
      // Return a new state object with 'valid' updated based on fields.
      return { ...s, valid: fieldsAreValid };
    });

    // Step 2: Execute custom rules.
    // These rules are `() => void` and are expected to:
    // - Read the latest state from `formState` (e.g., using `get(formState)` or by being up-to-date via `currentStoreValue` if they are components/runes-aware).
    // - Call `formState.update(...)` themselves if they determine the form is invalid or needs other state changes.
    // `currentStoreValue` will have been updated by the previous `formState.update()` call after Svelte's batching.
    if (currentStoreValue && currentStoreValue.customRules) {
      currentStoreValue.customRules.forEach(rule => {
        rule(); // Call the rule, expecting it to perform its own side effects on the formState store.
      });
    }
  };

  /**
   * Handles the form submission process.
   */
  const submitHandler = (event: Event) => {
    event.preventDefault(); // Standard JavaScript way to prevent default form submission

    if (!formState || !currentStoreValue) {
        return;
    }

    // Update the store to set 'submitted' to true.
    formState.update(s => {
      if (!s) return s;
      return { ...s, submitted: true };
    });

    // Run the full validation logic (field validation followed by custom rules).
    validate();

    // After `validate()` has run, `currentStoreValue` will reactively update
    // to reflect any changes made by field validation and custom rules.
    if (onSubmit) {
      // Check the 'valid' status from the reactive store value.
      // Svelte's reactivity ensures this check uses the latest state after updates from `validate()`.
      if (!currentStoreValue.valid) {
        // toast_error('Some fields were missing or incorrect'); // Your toast logic
        console.log('Form not valid. Toast error would show here.');
        return;
      }
      // If valid, call the provided onSubmit callback.
      onSubmit();
    }
  };

  // Effect to automatically re-validate the form when relevant parts of the store change (e.g., fields).
  $effect(() => {
    // This effect runs when formState is available and currentStoreValue (derived from it) is populated.
    if (formState && currentStoreValue) {
      // Establish a dependency on the 'fields' within the store's value.
      // Any change to `currentStoreValue.fields` will cause this effect to re-run.
      // Note: This tracks changes to the `fields` object reference or its top-level properties.
      // If individual, deeply nested properties within a field object change without replacing
      // the field object or the `fields` object, more specific dependencies might be needed,
      // or ensure store updates always create new objects.
      const _ = currentStoreValue.fields; 

      validate();
    }
  });

</script>

<form onsubmit={submitHandler} novalidate id={id}>
  {@render children?.()}
</form>

<style>
  /* Add any specific styles for your form component here */
</style>
