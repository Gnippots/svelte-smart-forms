<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
  import type { Snippet } from 'svelte';
  import { createFieldState } from './FieldState.svelte';
  import type { FieldState, FormState } from './Interfaces';
  import type { FullAutoFill } from 'svelte/elements';

  type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

  interface Props {
    label?: string;
    value?: string | number | null;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    showValidation?: boolean;
    formState: FormState;
    classes?: string;
    onChange?: () => void;
    onKeyup?: () => void;
    placeholder?: string;
    autocomplete?: FullAutoFill;
    type?: string;
    inputmode?: InputMode;
    readonly?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
    prefixText?: string;
    suffixText?: string;
    format?: (value: string | number | null | undefined) => string;
    parse?: (
      inputValue: string,
      currentValue: string | number | null | undefined
    ) => string | number | null | undefined;
    normalizeOnBlur?: (
      currentValue: string | number | null | undefined
    ) => string | number | null | undefined;
  }

  let {
    label = '',
    value = $bindable(''),
    required = false,
    name = '',
    disabled = false,
    showValidation = true,
    formState,
    classes = 'smart-form-input',
    onChange = () => {},
    onKeyup = () => {},
    placeholder = '',
    autocomplete = 'off',
    type = 'text',
    inputmode = undefined,
    readonly = false,
    prefix = undefined,
    suffix = undefined,
    prefixText = '',
    suffixText = '',
    format = undefined,
    parse = undefined,
    normalizeOnBlur = undefined
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());
  let isFocused = $state(false);
  let draftValue = $state<string | null>(null);

  function stringifyValue(currentValue: string | number | null | undefined) {
    if (currentValue === null || currentValue === undefined) {
      return '';
    }

    return String(currentValue);
  }

  const displayValue = $derived(
    isFocused && draftValue !== null
      ? draftValue
      : format
        ? format(value)
        : stringifyValue(value)
  );

  function handleInput(event: Event) {
    const inputValue = (event.currentTarget as HTMLInputElement).value;
    const nextValue = parse ? parse(inputValue, value) : inputValue;

    draftValue = inputValue;
    value = nextValue === undefined ? '' : nextValue;
    onChange();
  }

  function handleFocus() {
    isFocused = true;
    draftValue = stringifyValue(value);
  }

  function handleBlur() {
    if (normalizeOnBlur) {
      const nextValue = normalizeOnBlur(value);
      value = nextValue === undefined ? '' : nextValue;
      onChange();
    }

    isFocused = false;
    draftValue = null;
    fieldState.blur();
  }

</script>

{#snippet input()}
  <div class="smart-forms-text-input">
    {#if prefixText}
      <span class="smart-forms-input-affix">{prefixText}</span>
    {/if}
    {@render prefix?.()}
    <input
      onfocus={handleFocus}
      onblur={handleBlur}
      oninput={handleInput}
      {required}
      onkeyup={onKeyup}
      {disabled}
      {placeholder}
      {type}
      {inputmode}
      {readonly}
      {name}
      value={displayValue}
      autocomplete={autocomplete}
    />
    {@render suffix?.()}
    {#if suffixText}
      <span class="smart-forms-input-affix">{suffixText}</span>
    {/if}
  </div>
{/snippet}

<BaseInput
  {label}
  {classes}
  {required}
  {name}
  {value}
  bind:fieldState={fieldState}
  {formState}
  {showValidation}
  {onChange}
  validationFunctions={[]}
  input={input}
>
</BaseInput>
