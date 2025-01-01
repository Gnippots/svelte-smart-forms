<script>import BaseInput from "./BaseInput.svelte";
export let label = "";
export let value = "";
export let required = false;
export let name = "";
export let disabled = false;
export let formState = null;
export let classes = "smart-form-input";
export let on_change = () => {
};
export let placeholder = "";
export let confirm_against = "";
let fieldState;
let show_password;
function toggle_show() {
  show_password = !show_password;
}
let validate_confirmation = () => {
  if (confirm_against !== "" && value != "" && confirm_against !== value) {
    fieldState.add_error("confirm", "Passwords do not match");
  }
};
</script>

<BaseInput
    label={label}
    name={name}
    classes={classes}
    required={required}
    bind:value={value}
    bind:fieldState={fieldState}
    formState={formState}
    on_change={on_change}
    validation_functions={[validate_confirmation]}

>

    <div class="input-group" slot="input">
        {#if show_password}
        <input
            on:blur={() => {fieldState.blur()}}
            required={required}
            disabled="{disabled}"
            placeholder="{placeholder}"
            type="text"
            name="{name}"
            bind:value="{value}"
        />
        {:else}
        <input
            on:blur={() => {fieldState.blur()}}
            required={required}
            disabled="{disabled}"
            placeholder="{placeholder}"
            type="password"
            name="{name}"
            bind:value="{value}"
        />
        {/if}
        <div class="password-toggle" on:click={toggle_show}>
            Show
        </div>
    </div>
</BaseInput>