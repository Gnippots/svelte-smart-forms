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
export let min = null;
export let max = null;
let fieldState;
</script>
  
  <BaseInput
    label={label}
    required={required}
    classes={classes}
    name={name}
    bind:fieldState={fieldState}
    bind:value={value}
    formState={formState}
  >
    <input
    on:blur={() => {fieldState.blur()}}
    on:keyup={on_change}
    required={required}
    disabled="{disabled}"
    placeholder="{placeholder}"
    type="number"
    name="{name}"
    bind:value="{value}"
    min="{min}"
    max="{max}"
    />
  </BaseInput>
  