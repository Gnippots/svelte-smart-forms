# svelte-smart-forms

`svelte-smart-forms` is a Svelte 5 form library built around shared form state, component-level validation, and low-boilerplate form composition.

**Disclaimer** This library is very much still under construction. Use at your own peril.

## Current direction

The main idea is that form state is generated and kept in sync by the form components themselves. `createFormState()` returns a store with aggregate state such as:

- `valid`
- `dirty`
- `submitted`
- `errors`
- `fields`

You pass that store to `Form` and the input components, and the components register and synchronise themselves automatically.

## Basic usage

```svelte
<script lang="ts">
  import {
    createFormState,
    Form,
    TextInput,
    PasswordInput,
    FieldErrors
  } from '@gnippots/svelte-smart-forms';

  const formState = createFormState();

  const form = $state({
    email: '',
    password: '',
    password2: ''
  });

  function submit() {
    console.log('submitted');
  }
</script>

<Form {formState} onSubmit={submit}>
  <TextInput
    name="email"
    label="Email"
    bind:value={form.email}
    required
    {formState}
  />

  <PasswordInput
    name="password"
    label="Password"
    bind:value={form.password}
    required
    {formState}
  />

  <PasswordInput
    name="password2"
    label="Confirm password"
    bind:value={form.password2}
    confirm_against={form.password}
    required
    {formState}
  />

  <FieldErrors formState={formState} field="password2" />

  <button>Submit</button>
</Form>
```

## Supported components

The currently supported core surface is:

- `Form`
- `FieldErrors`
- `TextInput`
- `EmailInput`
- `PasswordInput`
- `NumberInput`
- `Dropdown`
- `CheckBox`
- `TextArea`
- `PhoneInput`
- `AddressField`
- `DatePicker`

`AddressField` and `DatePicker` are intended to stay part of the supported public API, though they still need more hardening than the simpler inputs.

## Preferred text formatting API

`TextInput` is now the preferred way to handle decorated or formatted text entry. It supports:

- `prefixText`
- `suffixText`
- `prefix`
- `suffix`
- `format`
- `parse`

Example:

```svelte
<script lang="ts">
  import { TextInput } from '@gnippots/svelte-smart-forms';

  let amount = $state<number | null>(1250);

  const currencyFormatter = new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: 0
  });

  function formatCurrency(value: string | number | null | undefined) {
    if (value === null || value === undefined || value === '') return '';
    return currencyFormatter.format(Number(value));
  }

  function parseCurrency(inputValue: string) {
    const cleaned = inputValue.replace(/[^0-9]/g, '');
    return cleaned === '' ? null : Number(cleaned);
  }
</script>

<TextInput
  name="amount"
  label="Amount"
  bind:value={amount}
  prefixText="$"
  format={formatCurrency}
  parse={parseCurrency}
  formState={formState}
/>
```

## Deprecated compatibility wrappers

These components are still exported to avoid breaking existing consumers, but new usage should prefer `TextInput` with `format`/`parse`/affix props:

- `CashInput`
- `PercentageInput`
- `MonthInput`

The wrappers are still usable today, but they are compatibility APIs rather than the preferred long-term direction.

## Custom validation

You can attach cross-field or form-level validation with `addCustomRule`:

```ts
formState.addCustomRule('password2', 'password_match', () => {
  return form.password === form.password2 ? null : 'Passwords do not match';
});
```

## Styling

The components are intentionally light on built-in styling. You can:

- target the default classes globally
- use the `classes` prop on each field wrapper
- provide your own affix snippets for `TextInput`

See `static/styles.css` for the current demo styling approach.

## Integration notes

- `AddressField` currently assumes the Google Maps JavaScript API is available in the browser.
- `DatePicker` uses `air-datepicker`.
- The library is Svelte 5-first.

## Developing

```bash
npm install
npm run dev
```

Everything inside `src/lib` is part of the library. Everything inside `src/routes` is the showcase app.

## Building

```bash
npm run package
```