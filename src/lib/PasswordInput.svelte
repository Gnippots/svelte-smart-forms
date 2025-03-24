<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
	import type { Snippet } from 'svelte';
  import type { FieldState, FormState } from './Interfaces';

  interface Props {
    label?: string;
    value?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    formState?: FormState | null;
    classes?: string;
    on_change?: any;
    placeholder?: string;
    confirm_against?: string;
    showPasswordToggle?: Snippet;
    hidePasswordToggle?: Snippet;
  }

  let {
    label = '',
    value = $bindable(''),
    required = false,
    name = '',
    disabled = false,
    formState = null,
    classes = 'smart-form-input',
    on_change = () => {},
    placeholder = '',
    confirm_against = '',
    showPasswordToggle = undefined,
    hidePasswordToggle = undefined
  }: Props = $props();
  
  let fieldState = $state<FieldState>();
  let show_password: boolean = $state(false);


  function toggle_show() {
    show_password = !show_password;
  }

  let validate_confirmation = () => {
    if (confirm_against !== '' && value != '' && confirm_against !== value) {
      fieldState?.add_error('confirm', 'Passwords do not match');
    }
  };
</script>

<BaseInput
  {label}
  {name}
  {classes}
  {required}
  bind:value
  bind:fieldState
  {formState}
  {on_change}
  validation_functions={[validate_confirmation]}
>
  {#snippet input()}
    <div class="input-group">
      {#if show_password}
        <input
          onblur={() => {
            fieldState?.blur();
          }}
          {required}
          {disabled}
          {placeholder}
          type="text"
          {name}
          bind:value
        />
      {:else}
        <input
          onblur={() => {
            fieldState?.blur();
          }}
          {required}
          {disabled}
          {placeholder}
          type="password"
          {name}
          bind:value
        />
      {/if}
      <button class="password-toggle" onclick={toggle_show}>
        {#if !show_password}
          {#if showPasswordToggle}
            {@render showPasswordToggle()}
          {:else}
            Show
          {/if}
        {:else}
          {#if hidePasswordToggle}
            {@render hidePasswordToggle()}
          {:else}
            Hide
          {/if}
        {/if}
      </button>
    </div>
  {/snippet}
</BaseInput>
