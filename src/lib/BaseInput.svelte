<script lang="ts">
  import { onDestroy, onMount, untrack, type Snippet } from 'svelte';
  import FieldErrors from '$lib/FieldErrors.svelte';
  import type { FormState, FieldState } from './Interfaces';

  interface Props {
    label?: string;
    value?: unknown;
    required?: boolean;
    disabled?: boolean;
    classes?: string;
    name: string;
    showValidation?: boolean;
    placeholder?: string;
    formState: FormState;
    onChange?: () => void;
    validationFunctions?: Array<() => void>;
    validationDependencies?: Array<unknown>;
    fieldState: FieldState;
    input?: Snippet;
  }

  let {
    label = '',
    value = $bindable(),
    required = false,
    disabled = false,
    classes = 'smart-form-input',
    name,
    showValidation = false,
    placeholder = '',
    formState,
    onChange = () => {},
    validationFunctions = [],
    validationDependencies = [],
    fieldState = $bindable(),
    input
  }: Props = $props();

  let mounted = $state(false);
  let registeredName = '';
  let previousBlurred = $state(fieldState.blurred);

  function isEmptyValue(currentValue: unknown) {
    return currentValue === null || currentValue === '' || currentValue === false;
  }

  // Push the current field object through the store so aggregate form state recalculates.
  function syncField() {
    if (!mounted || !registeredName) {
      return;
    }

    formState.syncField(registeredName, fieldState);
  }

  // Keep all validation mutations in one place before syncing the field into the form store.
  function validate(
    currentValue: unknown,
    currentRequired = required,
    currentValidationFunctions = validationFunctions
  ) {
    fieldState.setValue(currentValue);
    fieldState.resetValidation();

    if (currentRequired && isEmptyValue(currentValue)) {
      fieldState.addError('required', 'This is required');
    }

    currentValidationFunctions.forEach((fn) => {
      fn();
    });

    fieldState.setDirty(!Object.is(currentValue, fieldState.initialValue));
    syncField();
  }

  // Register once after mount. Field names are expected to be stable for a field's lifetime.
  onMount(() => {
    if (!name) {
      return;
    }

    fieldState.setInitialValue(value);
    formState.registerField(name, fieldState);
    registeredName = name;
    mounted = true;
    validate(value, required, validationFunctions);
  });

  onDestroy(() => {
    if (registeredName) {
      formState.unregisterField(registeredName);
    }
  });

  // Re-run validation when the bound value, required flag, or external validation inputs change.
  $effect(() => {
    if (!mounted) {
      return;
    }

    const currentValue = value;
    const currentRequired = required;
    const currentValidationFunctions = validationFunctions;
    const currentValidationDependencies = validationDependencies;

    currentValidationDependencies.forEach((dependency) => dependency);
    untrack(() => validate(currentValue, currentRequired, currentValidationFunctions));
  });

  // Child input snippets own their native blur handlers, so BaseInput syncs the shared state here.
  $effect(() => {
    if (!mounted) {
      return;
    }

    const blurred = fieldState.blurred;

    if (blurred !== previousBlurred) {
      previousBlurred = blurred;
      syncField();
    }
  });
</script>

<div class={classes}>
  {#if label !== ''}
    <label for={name} class="smart-form-input-label">
      {label}{#if required}<span style="color: #ce0262">*</span>{/if}
    </label>
  {/if}

  {#if input}
    {@render input()}
  {:else}
    <input
      onkeyup={onChange}
      onblur={() => {
        fieldState.blur();
      }}
      {required}
      {disabled}
      {placeholder}
      type="text"
      {name}
      bind:value
    />
  {/if}

  {#if showValidation}
    <FieldErrors {formState} field={name} />
  {/if}
</div>