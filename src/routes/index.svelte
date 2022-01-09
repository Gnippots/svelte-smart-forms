<script>
    import {
        Form, 
        TextInput, 
        NumberInput, 
        Dropdown, 
        EmailInput, 
        AddressField, 
        FieldErrors,
        Checkbox, 
        DatePicker, 
        PasswordInput, 
        PhoneInput, 
        TextArea, 
        createFormValidator
    } from '$lib';

    const form_validator = createFormValidator();

    let form = {};

    let submit = () => {
        console.log('submitted');
    }

</script>

<div style="width: 500px">
    <Form validator={form_validator} onSubmit={submit}>
        <TextInput
            name={'text'}
            label={'Text'}
            bind:value={form.text}
            required={true}
            form_validator={form_validator}>
        </TextInput>

        <NumberInput
            name={'number'}
            min={0}
            max={100}
            label={'Number'}
            bind:value={form.number}
            required={true}
            form_validator={form_validator}>
        </NumberInput>

        <Dropdown
            name={'dropdown'}
            options={['One', 'Two']}
            label={'Dropdown'}
            bind:value={form.dropdown}
            required={true}
            form_validator={form_validator}>
        </Dropdown>

        <EmailInput
            name={'email'}
            label={'Email'}
            bind:value={form.email}
            required={true}
            form_validator={form_validator}>
        </EmailInput>

        <AddressField
            name={'address'}
            label={'Address'}
            bind:address={form.address}
            required={{'all': true}}
            form_validator={form_validator}>
        </AddressField>

        <Checkbox
            name={'checkbox'}
            required={true}
            bind:value={form.checkbox}
            form_validator={form_validator}
        >
            <span slot="label">
                Checkbox
            </span>
        </Checkbox>

        <DatePicker 
            name='datepicker' 
            bind:value={form.datepicker} 
            form_validator={form_validator} 
        >
        </DatePicker>

        <PasswordInput 
            name={'password'} 
            label={'Password'} 
            bind:value={form.password} 
            required={true} 
            form_validator={form_validator}>
        </PasswordInput>

        <PhoneInput 
            name={'phone'} 
            label={'Phone'}
            bind:value={form.phone}
            bind:area_code={form.area_code}
            required={true} 
            form_validator={form_validator}>
        </PhoneInput>

        <TextArea 
            name={'textarea'} 
            label={'Text Area'} 
            bind:value={form.textarea}
            required={true}
            rows={3}
            form_validator={form_validator}>
        </TextArea>

        <hr/>
        <p>Error Message component</p>
        <FieldErrors
            
        >

        </FieldErrors>

        <hr/>

        <button>Submit</button>
    </Form>
</div>

<pre>{JSON.stringify($form_validator, null, 4)}</pre>
<pre>{JSON.stringify(form, null, 4)}</pre>