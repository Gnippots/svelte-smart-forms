<script>
    import Form from '$lib/Form.svelte';
    import TextInput from '$lib//TextInput.svelte';
    import NumberInput from '$lib//NumberInput.svelte';
    import Dropdown from '$lib/Dropdown.svelte';
    import DatePicker from '$lib/DatePicker.svelte';
    import EmailInput from '$lib/EmailInput.svelte';
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
                <td>Form Valid: </td>
                <td>{$form_validator.valid} </td>
            </tr>
        </table>
    </Form>
</div>