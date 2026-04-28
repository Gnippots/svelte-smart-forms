<script lang="ts">
  import { onDestroy, onMount, type Snippet } from 'svelte';
  import FieldErrors from '$lib/FieldErrors.svelte';
  import type { FormState, FieldState } from './Interfaces';

  interface Props {
    label?: string;
    value?: unknown;
    required?: boolean;
    disabled?: boolean;
    classes?: string;
    name?: string;
    showValidation?: boolean;
    placeholder?: string;
    formState: FormState;
    onChange?: () => void;
    validationFunctions?: Array<() => void>;
    fieldState: FieldState;
    input?: Snippet;
  }

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
  }: Props = $props();

  let mounted = $state(false);
  let registeredName = $state(name);
  let previousBlurred = $state(fieldState.blurred);
  let previousValue = $state<unknown>(value);
  let previousRequired = $state(required);

  function isEmptyValue(currentValue: unknown) {
    return currentValue === null || currentValue === '' || currentValue === false;
  }

  function syncField() {
    if (!mounted || !name) {
      return;
    }

    formState.syncField(name, fieldState);
  }

  function validate(currentValue: unknown) {
    fieldState.setValue(currentValue);
    fieldState.resetValidation();

    if (required && isEmptyValue(currentValue)) {
      fieldState.addError('required', 'This is required');
    }

    validationFunctions.forEach((fn) => {
      fn();
    });

    fieldState.setDirty(!Object.is(currentValue, fieldState.initialValue));
    syncField();
  }

  onMount(() => {
    if (!name) {
      mounted = true;
      return;
    }

    fieldState.setInitialValue(value);
    formState.registerField(name, fieldState);
    registeredName = name;
    previousValue = value;
    previousRequired = required;
    mounted = true;
    validate(value);
  });

  onDestroy(() => {
    if (registeredName) {
      formState.unregisterField(registeredName);
    }
  });

  $effect(() => {
    if (!mounted || !name || name === registeredName) {
      return;
    }

    if (registeredName) {
      formState.unregisterField(registeredName);
    }

    formState.registerField(name, fieldState);
    registeredName = name;
    validate(value);
  });

  $effect(() => {
    if (!mounted || !name) {
      return;
    }

    const currentValue = value;
    const currentRequired = required;

    if (Object.is(currentValue, previousValue) && currentRequired === previousRequired) {
      return;
    }

    previousValue = currentValue;
    previousRequired = currentRequired;
    validate(currentValue);
  });

  $effect(() => {
    if (!mounted || !name) {
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