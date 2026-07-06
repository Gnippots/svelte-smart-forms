<script lang="ts">
  import type { FieldState, FormState } from './Interfaces';
  import BaseInput from '$lib/BaseInput.svelte';
  import { createFieldState } from './FieldState.svelte';
  import { tick } from 'svelte';
  import type { FullAutoFill } from 'svelte/elements';
  import {
    phoneCountries,
    type PhoneCountry,
    composeE164,
    digitsOnly,
    findCountryByIso,
    flagEmoji,
    isValidNationalNumber,
    parseE164,
    stripTrunkPrefix
  } from './countries';

  interface Props {
    label?: string;
    /** Bound value in E.164 form, e.g. "+61412345678". Empty string when no number entered. */
    value?: string;
    /** Selected country as an ISO 3166-1 alpha-2 code, e.g. "AU". Optional to bind. */
    country?: string;
    /** ISO code used when `value` carries no country (empty or bare local number). */
    defaultCountry?: string;
    /** Optional subset/ordering of the dropdown, as ISO codes. Defaults to all bundled countries. */
    countries?: Array<string>;
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
  }

  let {
    label = '',
    value = $bindable(''),
    country = $bindable(undefined),
    defaultCountry = 'AU',
    countries = undefined,
    required = false,
    name = '',
    disabled = false,
    showValidation = true,
    formState,
    classes = 'smart-form-input',
    onChange = () => {},
    onKeyup = () => {},
    placeholder = '',
    autocomplete = 'tel'
  }: Props = $props();

  let fieldState = $state<FieldState>(createFieldState());

  // Editing source of truth. `nationalInput` keeps the digits as the user typed
  // them (trunk zero preserved for display); the trunk prefix is stripped only
  // when composing/validating the E.164 value.
  let selectedIso = $state('');
  let nationalInput = $state('');

  // Dropdown UI state.
  let open = $state(false);
  let search = $state('');
  let highlightedIndex = $state(0);
  let rootEl = $state<HTMLDivElement>();
  let searchEl = $state<HTMLInputElement>();
  let triggerEl = $state<HTMLButtonElement>();
  let listEl = $state<HTMLUListElement>();

  const idBase = `sfp-${name || 'phone'}`;
  const listboxId = `${idBase}-listbox`;

  // Guards so the inbound sync effect can tell an external `value`/`country`
  // change apart from an echo of what we just emitted.
  let lastValue = value;
  let lastCountry = country;

  function resolveInitialIso(): string {
    return (
      findCountryByIso(country)?.iso ??
      findCountryByIso(defaultCountry)?.iso ??
      phoneCountries[0].iso
    );
  }

  // Initialise internal state from the incoming props (once). Work through
  // locals so the normalisation below doesn't read freshly-assigned $state.
  {
    const parsed = parseE164(value);
    const initialIso = parsed ? parsed.country : resolveInitialIso();
    const initialNational = parsed ? parsed.nationalNumber : digitsOnly(value);

    selectedIso = initialIso;
    nationalInput = initialNational;

    // Normalise the bound value to E.164 up front so consumers always read a
    // consistent shape, even when handed a bare local number to migrate.
    const normalized = composeE164(initialIso, initialNational);
    if (value !== normalized) {
      value = normalized;
    }
    if (country !== initialIso) {
      country = initialIso;
    }
    lastValue = value;
    lastCountry = country;
  }

  const optionList = $derived.by(() => {
    let list: PhoneCountry[];

    if (countries && countries.length > 0) {
      list = countries
        .map((iso) => findCountryByIso(iso))
        .filter((entry): entry is PhoneCountry => Boolean(entry));
    } else {
      list = phoneCountries;
    }

    // Ensure the current selection is always representable in the dropdown.
    if (!list.some((entry) => entry.iso === selectedIso)) {
      const selected = findCountryByIso(selectedIso);
      if (selected) {
        list = [selected, ...list];
      }
    }

    return list;
  });

  const selectedCountry = $derived(findCountryByIso(selectedIso));
  const nationalDigits = $derived(stripTrunkPrefix(digitsOnly(nationalInput)));

  // Filter by country name, ISO code, or dial-code digits (substring match).
  const filtered = $derived.by(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return optionList;
    }

    const queryDigits = query.replace(/\D/g, '');
    return optionList.filter(
      (option) =>
        option.name.toLowerCase().includes(query) ||
        option.iso.toLowerCase().includes(query) ||
        (queryDigits !== '' && option.dialCode.includes(queryDigits))
    );
  });

  const activeOptionId = $derived(
    filtered[highlightedIndex] ? `${idBase}-opt-${filtered[highlightedIndex].iso}` : undefined
  );

  // Keep the highlight within the (possibly shrinking) filtered list.
  $effect(() => {
    const length = filtered.length;
    if (highlightedIndex > length - 1) {
      highlightedIndex = Math.max(0, length - 1);
    }
  });

  // Push internal edits out to the bound props.
  function emit() {
    const next = composeE164(selectedIso, nationalInput);

    if (value !== next) {
      value = next;
    }
    if (country !== selectedIso) {
      country = selectedIso;
    }

    lastValue = next;
    lastCountry = selectedIso;
    onChange();
  }

  function handleNumberInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    // Keep only characters that belong in a typed phone number.
    const sanitized = element.value.replace(/[^\d\s()-]/g, '');

    // When sanitizing rejects a char, `nationalInput` may be unchanged, so Svelte
    // won't re-render the input — push the cleaned value back to the DOM directly.
    if (element.value !== sanitized) {
      const caret = Math.max(0, (element.selectionStart ?? sanitized.length) - 1);
      element.value = sanitized;
      element.setSelectionRange(caret, caret);
    }

    nationalInput = sanitized;
    emit();
  }

  async function openDropdown() {
    if (disabled) {
      return;
    }

    open = true;
    search = '';
    highlightedIndex = Math.max(
      0,
      optionList.findIndex((option) => option.iso === selectedIso)
    );

    await tick();
    searchEl?.focus();
  }

  function closeDropdown(refocusTrigger = false) {
    open = false;
    if (refocusTrigger) {
      triggerEl?.focus();
    }
  }

  function toggleDropdown() {
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function selectCountry(iso: string) {
    selectedIso = iso;
    emit();
    closeDropdown(true);
  }

  async function scrollHighlightIntoView() {
    await tick();
    const item = listEl?.children[highlightedIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }

  function handleSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      highlightedIndex = Math.min(filtered.length - 1, highlightedIndex + 1);
      scrollHighlightIntoView();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      highlightedIndex = Math.max(0, highlightedIndex - 1);
      scrollHighlightIntoView();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = filtered[highlightedIndex];
      if (option) {
        selectCountry(option.iso);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeDropdown(true);
    }
  }

  // Close the popover when the user interacts outside of it.
  function handleWindowPointerDown(event: PointerEvent) {
    if (open && rootEl && !rootEl.contains(event.target as Node)) {
      open = false;
    }
  }

  // Absorb external changes to `value`/`country` (form reset, async load, etc.)
  // without clobbering in-progress edits — guarded by the last emitted values.
  $effect(() => {
    const incomingValue = value;
    const incomingCountry = country;

    if (incomingCountry && incomingCountry !== lastCountry) {
      const matched = findCountryByIso(incomingCountry);
      if (matched) {
        selectedIso = matched.iso;
      }
      lastCountry = incomingCountry;
    }

    if (incomingValue !== lastValue) {
      const parsed = parseE164(incomingValue);
      if (parsed) {
        selectedIso = parsed.country;
        nationalInput = parsed.nationalNumber;
      } else {
        nationalInput = digitsOnly(incomingValue ?? '');
      }
      lastValue = incomingValue;
    }
  });

  // Empty is handled by BaseInput's `required` check; only flag non-empty numbers
  // that fail the plausibility rules for the selected country.
  const validatePhone = () => {
    if (!nationalDigits) {
      return;
    }

    if (!isValidNationalNumber(findCountryByIso(selectedIso), nationalDigits)) {
      fieldState.addError('phone', 'Invalid phone number');
    }
  };
</script>

<svelte:window onpointerdown={handleWindowPointerDown} />

{#snippet input()}
  <div class="sfp" bind:this={rootEl}>
    <div class="sfp-country">
      <button
        type="button"
        class="sfp-trigger"
        bind:this={triggerEl}
        {disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select country calling code"
        onclick={toggleDropdown}
      >
        <span class="sfp-flag">{flagEmoji(selectedIso)}</span>
        <span class="sfp-dial">+{selectedCountry?.dialCode ?? ''}</span>
        <span class="sfp-caret" aria-hidden="true"></span>
      </button>

      {#if open}
        <div class="sfp-popover">
          <input
            class="sfp-search"
            type="text"
            role="combobox"
            placeholder="Search country or code"
            bind:this={searchEl}
            bind:value={search}
            onkeydown={handleSearchKeydown}
            aria-label="Search country or calling code"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-activedescendant={activeOptionId}
            autocomplete="off"
          />
          <ul class="sfp-list" id={listboxId} role="listbox" bind:this={listEl}>
            {#each filtered as option, index (option.iso)}
              <!-- Keyboard interaction is handled on the combobox input via
                   aria-activedescendant; options are pointer targets only. -->
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <li
                id={`${idBase}-opt-${option.iso}`}
                role="option"
                aria-selected={option.iso === selectedIso}
                class="sfp-option"
                class:is-highlighted={index === highlightedIndex}
                class:is-selected={option.iso === selectedIso}
                onmouseenter={() => (highlightedIndex = index)}
                onclick={() => selectCountry(option.iso)}
              >
                <span class="sfp-flag">{flagEmoji(option.iso)}</span>
                <span class="sfp-name">{option.name}</span>
                <span class="sfp-dial">+{option.dialCode}</span>
              </li>
            {:else}
              <li class="sfp-empty">No matches</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>

    <input
      class="sfp-number"
      type="tel"
      inputmode="tel"
      {name}
      {required}
      {disabled}
      {placeholder}
      value={nationalInput}
      oninput={handleNumberInput}
      onkeyup={onKeyup}
      onblur={() => {
        fieldState.blur();
      }}
      autocomplete={autocomplete}
    />
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
  validationFunctions={[validatePhone]}
  validationDependencies={[selectedIso, nationalInput]}
  input={input}
>
</BaseInput>

<style>
  .sfp {
    display: flex;
    align-items: stretch;
    width: 100%;
    margin-bottom: 4px;
  }

  .sfp-country {
    position: relative;
    flex: 0 0 auto;
  }

  .sfp-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 100%;
    min-height: calc(1em + 1rem + 2px);
    padding: 0 0.625rem;
    border: 1px solid #dcdcdc;
    border-right: 0;
    border-radius: 2px 0 0 2px;
    background: #fff;
    color: #495057;
    font-size: 13px;
    line-height: 1.47;
    cursor: pointer;
    white-space: nowrap;
  }

  .sfp-trigger:disabled {
    cursor: not-allowed;
    background-color: #f3f4f6;
    color: #6b7280;
  }

  .sfp-flag {
    font-size: 1.15em;
    line-height: 1;
  }

  .sfp-dial {
    font-variant-numeric: tabular-nums;
  }

  .sfp-caret {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid currentColor;
    opacity: 0.6;
  }

  .sfp-number {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: 1px solid #dcdcdc;
    border-radius: 0 2px 2px 0;
    height: calc(1em + 1rem + 2px);
    padding: 0.5rem 0.875rem;
    font-weight: 400;
    color: #495057;
    font-size: 13px;
    line-height: 1.47;
  }

  .sfp-number:disabled {
    background-color: #f3f4f6;
    color: #6b7280;
  }

  .sfp-popover {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    z-index: 1000;
    width: 280px;
    max-width: 80vw;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }

  .sfp-search {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid #eee;
    padding: 0.5rem 0.75rem;
    font-size: 13px;
    color: #495057;
    outline: none;
  }

  .sfp-list {
    list-style: none;
    margin: 0;
    padding: 4px 0;
    max-height: 240px;
    overflow-y: auto;
  }

  .sfp-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: 13px;
    color: #495057;
    cursor: pointer;
  }

  .sfp-option.is-highlighted {
    background-color: #f0f4ff;
  }

  .sfp-option.is-selected {
    font-weight: 600;
  }

  .sfp-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sfp-option .sfp-dial {
    color: #6b7280;
  }

  .sfp-empty {
    padding: 10px 12px;
    font-size: 13px;
    color: #9ca3af;
  }
</style>
