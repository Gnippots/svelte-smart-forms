<script>import BaseInput from "./BaseInput.svelte";
export let label = "";
export let value = "";
export let required = false;
export let name = "";
export let disabled = false;
export let show_validation = true;
export let formState = null;
export let classes = "smart-form-input";
export let on_change = () => {
};
export let on_keyup = () => {
};
export let placeholder = "";
let fieldState;
let validate_email = () => {
  if (value) {
    if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      fieldState.add_error("email", "Invalid Email Address");
    }
  }
};
</script>
  
  <BaseInput
    label={label}
    classes={classes}
    required={required}
    name={name}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    show_validation={show_validation}
    on_change={on_change}
    validation_functions={[validate_email]}
  >
    <input 
      slot="input"
      on:blur={() => {fieldState.blur()}}
      required={required}
      on:keyup={on_keyup}
      disabled={disabled}
      placeholder={placeholder}
      type="email"
      name={name}
      bind:value={value}
    />
  </BaseInput>
  