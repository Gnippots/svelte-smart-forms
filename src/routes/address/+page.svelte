<script lang="ts">
  import { Form, AddressField, createFormState } from '$lib';

  const formState = createFormState();

  const form: {
    address?: any;
  } = $state({
    address: {},
  });
</script>

<div>
  <Form {formState}>
    <AddressField>
      
    </AddressField>
  </Form>
</div>