<script>import BaseInput from "./BaseInput.svelte";
export let label = "";
export let value = "";
export let required = false;
export let name = "";
export let disabled = false;
export let formState = null;
export let classes = "smart-form-input";
export let options = [];
export let option_groups = [];
export let on_change = () => {
};
export let placeholder = "";
export let on_blur = () => {
};
let formatted_options = [];
let formatted_option_groups = [];
function format_options(unformatted_options) {
  unformatted_options.forEach((option, index) => {
    if (typeof option == "string") {
      formatted_options.push({ "value": option, "name": option, "disabled": false });
    } else {
      option.disabled = option.disabled == true;
      formatted_options.push({ "value": option.value, "name": option.name, "disabled": option.disabled });
    }
  });
  return formatted_options;
}
if (option_groups.length > 0) {
  option_groups.forEach((o) => {
    formatted_option_groups.push({
      "label": o.label,
      "options": format_options(o.options)
    });
  });
} else {
  formatted_options = format_options(options);
}
</script>
  
  <BaseInput
    label={label}
    required={required}
    name={name}
    bind:value={value}
    formState={formState}
    classes={classes}
    on_change={on_change}
  >
    <div style="margin-bottom: 4px;" slot="input">
      <select
        style="padding: .1rem"
        required={required}
        disabled={disabled}
        name={name}
        bind:value={value}
        on:blur={on_blur}
        on:change={on_change}
      >
        {#if placeholder}
        <option value={value}>{placeholder}</option>
        {/if}
  
        {#each formatted_option_groups as group}
        <optgroup label={group.label}>
          {#each group.options as option}
          <option value={option.value}>{option.name}</option>
          {/each}
        </optgroup>
        {/each}
  
        {#each formatted_options as option}
        <option value={option.value} disabled={option.disabled}>{option.name}</option>
        {/each}
      </select>
    </div>
  </BaseInput>
  