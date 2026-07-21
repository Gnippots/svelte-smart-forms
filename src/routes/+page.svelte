<script lang="ts">
  import {
    CashInput,
    CheckBox,
    DatePicker,
    Dropdown,
    EmailInput,
    FieldErrors,
    Form,
    MonthInput,
    NumberInput,
    PasswordInput,
    PercentageInput,
    PhoneInput,
    TextArea,
    TextInput,
    TimePicker,
    createMoneyMask,
    createPercentageMask,
    createFormState
  } from '$lib';
  import AddressField from '$lib/AddressField.svelte';

  const formState = createFormState();
  const moneyMask = createMoneyMask({ locale: 'en-AU', prefixText: '$' });
  const percentageMask = createPercentageMask();

  const form = $state({
    text: '',
    number: 10,
    dropdown: '',
    email: '',
    address: {},
    checkbox: false,
    datepicker: '2026-04-08',
    monthText: '2026-04',
    timepicker: '09:30',
    password: '',
    password2: '',
    textarea: '',
    phone: '',
    phoneCountry: 'AU',
    amount: 1250,
    percent: 25,
    legacyCash: 750,
    legacyPercentage: 15,
    legacyMonth: '2026-04',
    linkedNumber1: 0,
    linkedNumber2: 0,
    cash: 0
  });

  function validateLinkedNumbers() {
    if (form.linkedNumber1 + form.linkedNumber2 <= 0) {
      return 'The sum of both numbers must be greater than zero';
    }

    return null;
  }

  formState.addCustomRule('linkedNumber1', 'sum_validation', validateLinkedNumbers);
  formState.addCustomRule('linkedNumber2', 'sum_validation', validateLinkedNumbers);

  function submit() {
    console.log('submitted', $state.snapshot(form));
  }

  function serializeFormState(state: ReturnType<typeof createFormState> extends { subscribe: (run: (value: infer T) => void) => () => void } ? T : never) {
    return {
      ...state,
      fields: Object.fromEntries(
        Object.entries(state.fields).map(([fieldName, field]) => [
          fieldName,
          {
            value: field.value,
            initialValue: field.initialValue,
            dirty: field.dirty,
            valid: field.valid,
            blurred: field.blurred,
            errors: field.errors
          }
        ])
      )
    };
  }

  function serializeBoundValues() {
    return {
      text: form.text,
      number: form.number,
      dropdown: form.dropdown,
      email: form.email,
      address: form.address,
      checkbox: form.checkbox,
      datepicker: form.datepicker,
      monthText: form.monthText,
      timepicker: form.timepicker,
      password: form.password,
      password2: form.password2,
      textarea: form.textarea,
      phone: form.phone,
      amount: form.amount,
      percent: form.percent,
      legacyCash: form.legacyCash,
      legacyPercentage: form.legacyPercentage,
      legacyMonth: form.legacyMonth,
      linkedNumber1: form.linkedNumber1,
      linkedNumber2: form.linkedNumber2
    };
  }

  const formStateDebug = $derived(JSON.stringify(serializeFormState($formState), null, 2));
  const boundValuesDebug = $derived(JSON.stringify(serializeBoundValues(), null, 2));
</script>

<svelte:head>
  <title>svelte-smart-forms showcase</title>
</svelte:head>

<div class="page">
  <div class="demo">
    <h1>svelte-smart-forms</h1>
    <p>Core supported components plus compatibility wrappers for the deprecated text-like APIs.</p>

    <Form {formState} onSubmit={submit}>
      <h2>Supported core inputs</h2>

      <TextInput
        name="text"
        label="Text"
        bind:value={form.text}
        required
        {formState}
      />

      <TextInput
        name="amount"
        label="Amount (preferred API)"
        bind:value={form.amount}
        prefixText={moneyMask.prefixText}
        inputmode={moneyMask.inputmode}
        format={moneyMask.format}
        parse={moneyMask.parse}
        normalizeOnBlur={moneyMask.normalizeOnBlur}
        {formState}
      />

      <TextInput
        name="percent"
        label="Percent (preferred API)"
        bind:value={form.percent}
        suffixText={percentageMask.suffixText}
        inputmode={percentageMask.inputmode}
        format={percentageMask.format}
        parse={percentageMask.parse}
        normalizeOnBlur={percentageMask.normalizeOnBlur}
        {formState}
      />

      <NumberInput
        name="number"
        min={0}
        max={100}
        label="Number"
        bind:value={form.number}
        required
        {formState}
      />

      <Dropdown
        name="dropdown"
        options={['One', 'Two']}
        label="Dropdown"
        bind:value={form.dropdown}
        required
        {formState}
      />

      <EmailInput
        name="email"
        label="Email"
        bind:value={form.email}
        required
        {formState}
      />

      <PhoneInput
        name="phone"
        label="Phone"
        bind:value={form.phone}
        bind:country={form.phoneCountry}
        required
        {formState}
      />

      <TextArea
        name="textarea"
        label="Text area"
        bind:value={form.textarea}
        required
        rows={3}
        {formState}
      />

      <CheckBox
        label="Checkbox"
        name="checkbox"
        bind:value={form.checkbox}
        {formState}
      />

      <DatePicker
        name="datepicker"
        label="Date picker"
        bind:value={form.datepicker}
        {formState}
      />

      <CashInput
        name="cash"
        label="Cash"
        max={form.number}
        required={true}
        bind:value={form.cash}
        {formState}
      />

      <MonthInput
        name="monthText"
        label="Month"
        bind:value={form.monthText}
        {formState}
      />

      <TimePicker
        name="timepicker"
        label="Time picker"
        bind:value={form.timepicker}
        minutesStep={5}
        {formState}
      />

      <AddressField
        name="address"
        label="Address field (NZ only)"
        bind:address={form.address}
        regionCodes={['nz']}
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
        confirm_against={form.password}
        bind:value={form.password2}
        required
        {formState}
      />

      <FieldErrors formState={formState} field="password2" />

      <NumberInput
        name="linkedNumber1"
        label="Linked number 1"
        bind:value={form.linkedNumber1}
        required
        {formState}
      />

      <NumberInput
        name="linkedNumber2"
        label="Linked number 2"
        bind:value={form.linkedNumber2}
        required
        {formState}
      />

      <h2>Deprecated compatibility wrappers</h2>

      <CashInput
        name="legacyCash"
        label="CashInput"
        bind:value={form.legacyCash}
        {formState}
      />

      <PercentageInput
        name="legacyPercentage"
        label="PercentageInput"
        bind:value={form.legacyPercentage}
        {formState}
      />

      <MonthInput
        name="legacyMonth"
        label="MonthInput"
        bind:value={form.legacyMonth}
        {formState}
      />

      <button>Submit</button>
    </Form>
  </div>

  <div class="state">
    <h2>Form state</h2>
    <pre>{formStateDebug}</pre>

    <h2>Bound values</h2>
    <pre>{boundValuesDebug}</pre>
  </div>
</div>

<style>
  .page {
    display: grid;
    gap: 2rem;
    grid-template-columns: minmax(0, 680px) minmax(0, 1fr);
    align-items: start;
    padding: 2rem;
  }

  .demo,
  .state {
    min-width: 0;
  }

  .demo :global(form) {
    display: grid;
    gap: 1rem;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  pre {
    margin: 0;
    padding: 1rem;
    overflow: auto;
    background: #111827;
    color: #e5e7eb;
    border-radius: 0.5rem;
  }

  @media (max-width: 960px) {
    .page {
      grid-template-columns: 1fr;
    }
  }
</style>
