<script lang="ts">
  import {
    Form,
    TextInput,
    NumberInput,
    Dropdown,
    EmailInput,
    FieldErrors,
    CheckBox,
    DatePicker,
    PasswordInput,
    PhoneInput,
    TextArea,
    createFormState
  } from '$lib';
  import AddressField from '$lib/AddressField.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import CashInput from '$lib/CashInput.svelte';

  const formState = createFormState();



  const form: {
    text?: string;
    number: number;
    dropdown?: string;
    email: string;
    address?: any;
    checkbox?: boolean;
    datepicker?: Date;
    password?: string;
    password2?: string;
    textarea?: string;
    phone?: string;
    linkedNumber1: number;
    linkedNumber2: number;
  } = $state({
    text: '',
    number: 0,
    dropdown: '',
    email: '',
    address: {},
    checkbox: false,
    datepicker: new Date(),
    password: '',
    password2: '',
    textarea: '',
    phone: '',
    linkedNumber1: 0,
    linkedNumber2: 0
  });

  formState.addCustomRule(
    'linkedNumber1',
    'sum_validation',
    () => {
      if (form.linkedNumber1 + form.linkedNumber2 <= 0) {
        return 'The sum of both numbers must be greater than zero';
      }
      return null;
    }
  );

  let submit = () => {
    console.log('submitted');
  };
</script>

<div style="width: 500px">
  <Form {formState} onSubmit={submit}>
    <TextInput
      name={'text'}
      label={'Text'}
      bind:value={form.text}
      required
      {formState}
    ></TextInput>

    <NumberInput
      name={'number'}
      min={0}
      max={100}
      label={'Number'}
      bind:value={form.number}
      required={true}
      {formState}
    ></NumberInput>

    <Dropdown
      name='dropdown'
      options={['One', 'Two']}
      label='Dropdown'
      bind:value={form.dropdown}
      required={true}
      {formState}
    ></Dropdown>

    <EmailInput
      name='email'
      label='Email'
      bind:value={form.email}
      required={true}
      {formState}
    ></EmailInput>

<!-- 
    <AddressField
      name="address"
      label="Address Field"
      bind:address={form.address}
      required={true}
      {formState}
    ></AddressField>
  -->

    <CheckBox
      label="Checkbox"
      name={'checkbox'}
      required={true}
      bind:value={form.checkbox}
      {formState}
    />

    <DatePicker name="datepicker" bind:value={form.datepicker} {formState}></DatePicker>

    <PasswordInput
      name='password'
      label='Password'
      bind:value={form.password}
      required={true}
      {formState}
    />

    <PasswordInput
      name='password2'
      label='Confirm Password'
      confirm_against={form.password}
      bind:value={form.password2}
      required={true}
      {formState}
    />

    <TextArea
      name='textarea'
      label='Text Area'
      bind:value={form.textarea}
      required={true}
      rows={3}
      {formState}
    />

    <PhoneInput
      name='phone'
      label='Phone'
      bind:value={form.phone}
      required={true}
      {formState}
    />

    <CashInput
    name='cash'
    label='Cash'
    {formState}
    />

    <NumberInput
      name={'linkedNumber1'}
      label={'Linked Number 1'}
      bind:value={form.linkedNumber1}
      required={true}
      {formState}
    ></NumberInput>

    <NumberInput
      name={'linkedNumber2'}
      label={'Linked Number 2'}
      bind:value={form.linkedNumber2}
      required={true}
      {formState}
    ></NumberInput>

    <hr />
    <p>Error Message component</p>
    <FieldErrors></FieldErrors>

    <hr />

    <button>Submit</button>
  </Form>
</div>

<pre>{JSON.stringify($formState, null, 4)}</pre>
<pre>{JSON.stringify($state.snapshot(form), null, 4)}</pre>
<SvelteToast />
