<script>
    import {Form, TextInput, NumberInput, Dropdown, EmailInput, AddressField, Checkbox, DatePicker, PasswordInput, PhoneInput, TextArea} from '$lib';
    import { createFormValidator } from '$lib/FormValidator';


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
            required={true}
            form_validator={form_validator}>
        </AddressField>

        <Checkbox
            name={'checkbox'}
            required={true}
            bind:value={form.checkbox}
            form_validator={form_validator}
        >
            <span slot="label">
                Checkbox Label is a slot
            </span>
        </Checkbox>

        <DatePicker 
            name='datepicker' 
            bind:value={form.datepicker} 
            form_validator={form_validator} 
            required={true}>
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
            bind:value="{form.textarea}" 
            required={true}
            rows={3}
            form_validator={form_validator}>
        </TextArea>

        <button>Submit</button>

        <table>
            <tr>
                <td>Text: </td>
                <td>{form.text} </td>
            </tr>

            <tr>
                <td>Number: </td>
                <td>{form.number} </td>
            </tr>

            <tr>
                <td>Dropdown: </td>
                <td>{form.dropdown} </td>
            </tr>

            <tr>
                <td>Email: </td>
                <td>{form.email} </td>
            </tr>

            <tr>
                <td>Checkbox: </td>
                <td>{form.checkbox} </td>
            </tr>

            <tr>
                <td>Form Valid: </td>
                <td>{$form_validator.valid} </td>
            </tr>
            


        </table>
    </Form>
</div>