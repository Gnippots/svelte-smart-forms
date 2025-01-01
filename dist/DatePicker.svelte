<script>import BaseInput from "./BaseInput.svelte";
export let label = "";
export let value = null;
export let required = false;
export let name = "";
export let disabled = false;
export let formState = null;
export let classes = "smart-form-input";
export let on_change = () => {
};
export let placeholder = "";
let fieldState;
</script>

<BaseInput
    label={label}
    classes={classes}
    placeholder={placeholder}
    required={required}
    name={name}
    disabled={disabled}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    on_change={on_change}

>
<div slot="input">
    DatePicker Coming Soon
    <!--<Datepicker/>-->
</div>
</BaseInput>