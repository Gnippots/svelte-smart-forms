<script lang="ts">
  import { run } from 'svelte/legacy';

  import { onMount } from 'svelte';
  import { BaseInput, TextInput, Dropdown, FieldErrors } from './';
  import clonedeep from 'lodash.clonedeep';

  import * as Gmaps from '@googlemaps/js-api-loader';
  const { Loader } = Gmaps;

  import type { Address, ComponentMap, FieldState } from './Interfaces';

  interface Props {
    API_KEY: string;
    address?: any;
    label?: string;
    formState?: any;
    required?: any;
    on_change?: any;
    classes?: string;
    name?: string;
    show_search?: boolean;
    mailing?: boolean;
    placeholder?: string;
  }

  let {
    API_KEY,
    address = $bindable(),
    label = '',
    formState = null,
    required = {},
    on_change = () => {},
    classes = 'smart-form-input',
    name = 'null',
    show_search = true,
    mailing = false,
    placeholder
  }: Props = $props();

  let element: HTMLInputElement | null = $state(null);
  let incomplete = $state(false);
  let formatted_address = $state('');
  let search = $state('');
  let show_full_address = $state(false);
  let all_changes = $state(() => {});

  function is_required(field: any) {
    if (required.all || required[field]) {
      return true;
    }
  }

  const empty_address: Address = {
    unit_number: '',
    street_number: '',
    street_name: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    po_box: ''
  };

  const component_map: ComponentMap = {
    street_number: 'street_number',
    route: 'street_name',
    locality: 'city',
    country: 'country',
    administrative_area_level_1: 'state',
    postal_code: 'postcode',
    subpremise: 'unit_number'
  };

  async function initAutoComplete(inputElement: HTMLInputElement) {
    const loader = new Loader({
      apiKey: API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    const options = {
      types: ['address'],
      componentRestrictions: { country: 'AU' }
    };

    const { Autocomplete } = await loader.importLibrary('places');
    return new Autocomplete(inputElement, options);
  }

  function handlePlaceChanged(place: any) {
    let new_address = clonedeep(empty_address);

    if (place.address_components) {
      for (let component of place.address_components) {
        const addressType = component.types[0];
        if (component_map[addressType]) {
          new_address[component_map[addressType]] = component.short_name;
        }
      }
    }
    address = {...new_address};
  }

  onMount(async () => {
    all_changes = () => {
      on_change();
      //fieldState.dirty = value == fieldState.initial_value;
    };

    if (element) {
      const autoComplete = await initAutoComplete(element);

      autoComplete.addListener('place_changed', () => {
        handlePlaceChanged(autoComplete.getPlace())
      });
    }
  });

  run(() => {
    let s = '';
    let fields = ['street_number', 'street_name', 'city', 'state', 'postcode', 'country'];
    let country = address.country;
    if (mailing) {
      fields = fields.concat(['first_name', 'role', 'company_name']);
    }
    incomplete = false;

    fields.forEach((field) => {
      if (!address[field] && is_required(field)) {
        incomplete = true;
      }
    });
    if (incomplete) {
      formatted_address = '';
    }

    if (address.unit_number) {
      s += `${address.unit_number}/`;
    }
    if (country === 'AU') {
      country = 'Australia';
    }
    s += `${address.street_number} ${address.street_name} ${address.city} ${address.state} ${address.postcode}`;
    formatted_address = s;
  });

  run(() => {
    if (!show_search) {
      show_full_address = true;
    }
  });

  let fieldState = $state<FieldState>();
</script>

<BaseInput
    name={name}
    bind:value={search}
    bind:fieldState={fieldState}
    formState={formState}
    on_change={on_change}
    {required}
    label={label}
>
    {#snippet input()}
      <input
          bind:this={element}
          {placeholder}
          {name}
          onblur={() => {
            fieldState?.blur();
          }}
          bind:value={search}
          onkeyup={all_changes}
      />
    {/snippet} 
</BaseInput>

{#if !show_full_address}
<div>
    {#if incomplete}
    <p class="smart-form-formatted-address">Address is incomplete</p>
    {/if}
</div>
{/if}

{#if show_full_address}
<div>
    {#if mailing}        

    <TextInput 
        name={name+'_name'} 
        label={'Name'} 
        bind:value={address.first_name} 
        formState={formState}
        required={mailing && (required.name || required.all)}
    ></TextInput>

    <TextInput 
        name={name+'_role'} 
        label={'Role'} 
        bind:value={address.role} 
        formState={formState}
        required={mailing && (required.role || required.all)}
    ></TextInput>

    <TextInput 
        name={name+'_company_name'} 
        label={'Company Name'} 
        bind:value={address.company_name} 
        formState={formState}
        required={mailing && (required.company_name || required.all)}
    ></TextInput>
    
    {/if}

    <TextInput 
        name={name+'_unit_number'} 
        label={'Unit #'} 
        bind:value={address.unit_number} 
        formState={formState}
    ></TextInput>

    <TextInput 
        name={name+'_street_number'} 
        label={'Street #'} 
        bind:value={address.street_number}
        formState={formState}
        required={required.street_number || required.all}
    ></TextInput>

    <TextInput 
        name={name+'_street_name'} 
        label={'Street Name'} 
        bind:value={address.street_name} 
        formState={formState}
        required={required.street_name || required.all}
    ></TextInput>
        
    <TextInput 
        name={name+'_city'} 
        label={'City'} 
        bind:value={address.city} 
        formState={formState}
        required={required.city || required.all}
    ></TextInput>
        
    <Dropdown 
        name={name+'_state'}
        label={'State'}
        options={['NSW', 'VIC', 'QLD', 'NT', 'WA', 'SA', 'ACT', 'TAS']}
        bind:value={address.state}
        formState={formState}
        required={required.state || required.all}
    ></Dropdown>
        
    <TextInput 
        name={name+'_postcode'} 
        label={'Postcode'} 
        bind:value={address.postcode}
        formState={formState}
        required={required.postcode || required.all}
    ></TextInput>

    <Dropdown 
        name={name+'_country'}
        label={'Country'}
        options={['AU']}                     
        bind:value={address.country}
        formState={formState}
        required={required.city || required.all}
    ></Dropdown>
</div>
{/if}

<style></style>
