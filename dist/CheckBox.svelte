<script>import BaseInput from "./BaseInput.svelte";
export let label = "";
export let value = false;
export let required = false;
export let name = "";
export let disabled = false;
export let formState = null;
export let on_change = () => {
};
let fieldState;
</script>

<BaseInput
    label={label}
    name={name}
    required={required}
    bind:value={value}
    formState={formState}
    bind:fieldState={fieldState}
    on_change={on_change}
>
<div slot="input">
    <div class="custom-control custom-switch mb-2">
        <input
            type=checkbox
            class="custom-control-input"
            on:blur={() => {fieldState.blur()}}
            name={name}
            id={name}
            required={required}
            bind:checked={value}
            disabled={disabled}
        />
        
        <label for={name} class="custom-control-label">
            {value}
            <slot name="label"></slot>
        </label>
    </div>
</div>

</BaseInput>