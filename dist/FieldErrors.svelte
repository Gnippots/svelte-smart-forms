<script lang="ts">
  import type { FormState, FormStateStore } from './Interfaces';

  interface Props {
    formState?: FormState | null;
    field?: string | null;
  }

  let { formState = null, field = null }: Props = $props();
  let state = $state<FormStateStore | null>(null);

  $effect(() => {
    if (!formState) {
      state = null;
      return;
    }

    return formState.subscribe((nextState) => {
      state = nextState;
    });
  });
</script>

{#if state && field}
  <p class="error-message">
    {#if
      state.fields[field] &&
      Object.keys(state.fields[field].errors).length !== 0 &&
      (state.fields[field].blurred || state.submitted)}
      {state.fields[field].errors[Object.keys(state.fields[field].errors)[0]]}
    {/if}
  </p>
{/if}