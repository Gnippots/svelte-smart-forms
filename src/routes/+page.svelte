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
    import { SvelteToast } from '@zerodevx/svelte-toast'

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
    } = $state({});

    let submit = () => {
        console.log('submitted');
    }

</script>

<div style="width: 500px">
    <Form formState={formState} onSubmit={submit}>
        <TextInput
            name={'text'}
            label={'Text'}
            bind:value={form.text}
            required={true}
            formState={formState}>
        </TextInput>

        <NumberInput
            name={'number'}
            min={0}
            max={100}
            label={'Number'}
            bind:value={form.number}
            required={true}
            formState={formState}>
        </NumberInput>

        <Dropdown
            name={'dropdown'}
            options={['One', 'Two']}
            label={'Dropdown'}
            bind:value={form.dropdown}
            required={true}
            formState={formState}>
        </Dropdown>

        <EmailInput
            name={'email'}
            label={'Email'}
            bind:value={form.email}
            required={true}
            formState={formState}>
        </EmailInput>

        <CheckBox
            name={'checkbox'}
            required={true}
            bind:value={form.checkbox}
            formState={formState}
        >
            {#snippet label()}
                        <span >
                    Checkbox
                </span>
                    {/snippet}
        </CheckBox>

        <DatePicker 
            name='datepicker' 
            bind:value={form.datepicker} 
            formState={formState} 
        >
        </DatePicker>

        <PasswordInput 
            name={'password'} 
            label={'Password'} 
            bind:value={form.password} 
            required={true} 
            formState={formState}>
        </PasswordInput>
        
        <PasswordInput 
            name={'password2'} 
            label={'Confirm Password'} 
            confirm_against={form.password}
            bind:value={form.password2} 
            required={true} 
            formState={formState}>
        </PasswordInput>

        <TextArea 
            name={'textarea'} 
            label={'Text Area'} 
            bind:value={form.textarea}
            required={true}
            rows={3}
            formState={formState}>
        </TextArea>

        <PhoneInput 
            name={'phone'} 
            label={'Phone'}
            bind:value={form.phone}
            required={true} 
            formState={formState}>
        </PhoneInput>

        <hr/>
        <p>Error Message component</p>
        <FieldErrors
        >

        </FieldErrors>

        <hr/>

        <button>Submit</button>
    </Form>
</div>


<pre>{JSON.stringify($formState, null, 4)}</pre>
<pre>{JSON.stringify(form, null, 4)}</pre>
<SvelteToast />