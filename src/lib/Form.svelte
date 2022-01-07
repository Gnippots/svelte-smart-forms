<script>
    
    export let validator = null;
    export let onSubmit = null;
    import { toast_error } from '$lib/toast_themes';

    const validate = () => {
        $validator.valid = true;

        for (const [field_name, field] of Object.entries($validator.fields)) {
            if (!field.valid) {
                $validator.valid=false;
            }
        }

        $validator.customRules.forEach( (rule) => {
            rule()
        });
    }

    const submitHandler = (event) => {
        
        event.preventDefault();
        $validator.submitted = true;
        if (!onSubmit) { return };
        if (!$validator.valid) {
            toast_error('Some fields were missing or incorrect');
            return;
        }

        onSubmit();
    }

    $: {
        if (validator) {
            validate();
            $validator.fields
        }
    }

</script>

<form on:submit={event => {submitHandler(event)}} novalidate>
    <slot></slot>
</form>

<style></style>