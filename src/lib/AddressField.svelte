<script lang="ts">
  import { BaseInput } from './'; //, TextInput, Dropdown, FieldErrors } from './';
  import clonedeep from 'lodash.clonedeep';

  import type { Address, ComponentMap, FieldState } from './Interfaces';

  interface Props {
    address?: any;
    label?: string;
    formState?: any;
    required?: any;
    onChange?: any;
    classes?: string;
    name?: string;
    show_search?: boolean;
    mailing?: boolean;
    placeholder?: string;
  }

  let {
    address = $bindable(),
    label = '',
    formState = null,
    required = {},
    onChange = () => {},
    classes = 'smart-form-input',
    name = 'null',
    placeholder
  }: Props = $props();

  let element: HTMLInputElement | null = $state(null);
  let incomplete = $state(false);
  let formatted_address = $state('');
  let search = $state('');
  let show_full_address = $state(false);
  let all_changes = $state(() => {});

  let isLoading = $state(false);
  let searchResults = $state([]) as any[];
  let debounceTimeout: number;


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
  
  async function makeGoogleMapsRequest() {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.importLibrary === 'undefined') {
      console.error('Google Maps JavaScript API not loaded yet. Please ensure the script tag in your HTML is correct and has loaded.');
      isLoading = false;
      return;
    }

    isLoading = true;

    try {
      const { AutocompleteSessionToken, AutocompleteSuggestion } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const token = new AutocompleteSessionToken();

      const gmapsRequest = {
        input: search,
        language: 'en-GB',
        sessionToken: token,
        includedPrimaryTypes: ['apartment_building', 'apartment_complex', 'condominium_complex', 'housing_complex', 'street_address'],
        includedRegionCodes: ['au', 'nz']
      };

      const response = await AutocompleteSuggestion.fetchAutocompleteSuggestions(gmapsRequest);

      if (response && response.suggestions) {
        searchResults = response.suggestions.map(suggestion => ({
          description: suggestion.placePrediction?.text.toString(),
          place_id: suggestion.placePrediction?.placeId
        }));
      } else {
        searchResults = [];
      }
   } catch(error) {
      console.error('Error getting Google Maps Results: ', error);
    } finally {
      isLoading = false;
    }
  }

  function debouncedMakeGoogleMapsRequest() {
    if (!search || search.trim() === '') return;

    clearTimeout(debounceTimeout);
    debounceTimeout = window.setTimeout(() => {
        makeGoogleMapsRequest();
    }, 400); 
  }

  async function handleSuggestionClick(selectedSuggestion: { description: string, place_id: string }) {
    if (!selectedSuggestion.place_id) {
        console.error("Selected suggestion has no place_id:", selectedSuggestion);
        return;
    }

    search = selectedSuggestion.description; // Update input field
    searchResults = []; // Clear suggestions

    try {
      if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.importLibrary === 'undefined') {
        console.error('Google Maps JavaScript API not loaded for fetching Place details.');
        isLoading = false;
        return;
      }
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

      const place = new Place({ id: selectedSuggestion.place_id });
      await place.fetchFields({ fields: ['addressComponents', 'formattedAddress'] });

      const newAddress = clonedeep(empty_address);
      formatted_address = place.formattedAddress || selectedSuggestion.description;

      if (place.addressComponents) {
        for (const component of place.addressComponents) {
          for (const type of component.types) {
            if (component_map[type]) {
              if (type === 'administrative_area_level_1' && component.shortText) {
                newAddress[component_map[type]] = component.shortText;
              } else {
                newAddress[component_map[type]] = component.longText || component.shortText || '';
              }
            }
          }
        }
      }
      
      // Basic check for incompleteness
      incomplete = !(newAddress.street_name && newAddress.city && newAddress.postcode && newAddress.country);
      
      address = newAddress; // Update the bindable address prop
    } catch (error) {
      console.error('Error fetching place details:', error);
      incomplete = true; // Assume incomplete on error
    }
  }

  let fieldState = $state<FieldState>();
</script>

{#snippet input()}
<div id="smart-forms-address-containter" class="address-container">
  <input
    bind:this={element}
    type="text"
    class={classes}
    placeholder={placeholder}
    name={name} 
    aria-label={label || 'Address search'}
    autocomplete="off"
    role="combobox"
    aria-autocomplete="list"
    aria-expanded={searchResults.length > 0}
    aria-controls="suggestions-list"
    onblur={() => {
      fieldState?.blur();
      // Slight delay to give chance to click on option
      setTimeout(() => {
        if (!element?.parentElement?.querySelector('.suggestions-list:hover')) {
            searchResults = [];
        }
      }, 200);
    }}
    bind:value={search}
    oninput={debouncedMakeGoogleMapsRequest}
    onfocus={() => {
      debouncedMakeGoogleMapsRequest();
    }}
  />
  {#if isLoading && searchResults.length === 0}
    <div class="loading-indicator">Loading suggestions...</div>
  {/if}
  {#if searchResults.length > 0}
  <ul id="suggestions-list" role="listbox" class="suggestions-list">
    {#each searchResults as result, index (result.place_id)}
    <li
        role="option"
        aria-selected={false}
        id={`suggestion-${index}`}
        onmouseenter={(e) => (e.target as HTMLLIElement).classList.add('suggestion-item-hover')}
        onmouseleave={(e) => (e.target as HTMLLIElement).classList.remove('suggestion-item-hover')}
        class="suggestion-item"
    >
      <button class="suggestion-item-button" onclick={() => handleSuggestionClick(result)}>{result.description}</button>
    </li>
    {/each}
  </ul>
  {/if}
</div>
{/snippet}

<BaseInput
    name={name}
    bind:value={search}
    bind:fieldState={fieldState}
    formState={formState}
    onChange={onChange}
    {required}
    label={label}
/>

{#if !show_full_address}
<div>
    {#if incomplete}
    <p class="address-warning">Address is incomplete</p>
    {/if}
</div>
{/if}

<style>
</style>
