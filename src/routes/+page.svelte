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

  const PUBLIC_GOOGLE_MAPS_API_KEY = 'AIzaSyA6TiGYW4XTaa79sSv-UWvrjbRFCuB_HIM';

  const formState = createFormState();

  const form: {
    text?: string;
    number?: number;
    dropdown?: string;
    email?: string;
    address?: any;
    checkbox?: boolean;
    datepicker?: Date;
    password?: string;
    password2?: string;
    textarea?: string;
    phone?: string;
  } = $state({
    text: '',
    number: 0,
    dropdown: '',
    email: '',
    address: {
      unit_number: '',
      street_number: '',
      street_name: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      po_box: ''
    },
    checkbox: false,
    datepicker: new Date(),
    password: '',
    password2: '',
    textarea: '',
    phone: ''
  });

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
      required={true}
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
      name={'dropdown'}
      options={['One', 'Two']}
      label={'Dropdown'}
      bind:value={form.dropdown}
      required={true}
      {formState}
    ></Dropdown>

    <EmailInput
      name={'email'}
      label={'Email'}
      bind:value={form.email}
      required={true}
      {formState}
    ></EmailInput>

    <AddressField
      name="address"
      label="Address Field"
      bind:address={form.address}
      required={true}
      {formState}
    ></AddressField>

    <CheckBox
      label="Checkbox"
      name={'checkbox'}
      required={true}
      bind:value={form.checkbox}
      {formState}
    ></CheckBox>

    <DatePicker name="datepicker" bind:value={form.datepicker} {formState}></DatePicker>

    <PasswordInput
      name={'password'}
      label={'Password'}
      bind:value={form.password}
      required={true}
      {formState}
    ></PasswordInput>

    <PasswordInput
      name={'password2'}
      label={'Confirm Password'}
      confirm_against={form.password}
      bind:value={form.password2}
      required={true}
      {formState}
    ></PasswordInput>

    <TextArea
      name={'textarea'}
      label={'Text Area'}
      bind:value={form.textarea}
      required={true}
      rows={3}
      {formState}
    ></TextArea>

    <PhoneInput
      name={'phone'}
      label={'Phone'}
      bind:value={form.phone}
      required={true}
      {formState}
    ></PhoneInput>

    <CashInput/>

    <hr />
    <p>Error Message component</p>
    <FieldErrors></FieldErrors>

    <hr />

    <button>Submit</button>
  </Form>
</div>

<pre>{JSON.stringify($formState, null, 4)}</pre>
<pre>{JSON.stringify(form, null, 4)}</pre>
<SvelteToast />
