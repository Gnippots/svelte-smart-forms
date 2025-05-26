<script lang="ts">
  import BaseInput from '$lib/BaseInput.svelte';
  import clonedeep from 'lodash.clonedeep';
  import { createFieldState } from './FieldState.svelte';
  import type { Address, ComponentMap, FieldState } from './Interfaces';

  let {
    address = $bindable(),
    label = '',
    formState = null,
    required = false,
    onChange = () => {},
    classes = 'smart-form-input',
    name = 'null',
    showValidation = true,
    placeholder
  }: {
    address?: any;
    label?: string;
    formState?: any;
    required?: boolean;
    onChange?: any;
    classes?: string;
    name?: string;
    showValidation?: boolean;
    mailing?: boolean;
    placeholder?: string;
  } = $props();

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

  let element: HTMLInputElement | null = $state(null);
  let incomplete = $state(false);
  let search = $state(!isAddressEffectivelyEmpty(address) ? formatAddressForSearch(address) : '');

  let isLoading = $state(false);
  let searchResults = $state([]) as any[];
  let debounceTimeout: number;

  function isAddressEffectivelyEmpty(addr: Address | undefined | null): boolean {
    if (!addr) return true;
    return Object.keys(empty_address).every(key => {
        const k = key as keyof Address;
        if (k === 'placeId' || k === 'po_box') return true;
        return !addr[k] || String(addr[k]).trim() === '';
    });
  }

  function formatAddressForSearch(addr: Address): string {
    if (!addr || Object.values(addr).every(val => !val || String(val).trim() === '')) {
        return '';
    }

    const displayParts: string[] = [];

    let streetLine = '';
    const unit = addr.unit_number ? String(addr.unit_number).trim() : '';
    const number = addr.street_number ? String(addr.street_number).trim() : '';
    const namePart = addr.street_name ? String(addr.street_name).trim() : '';

    if (unit) {
        streetLine += unit + "/";
    }
    if (number) {
        streetLine += number;
    }
    if (namePart) {
        // Add space if streetLine already has content (unit/number) and doesn't end with '/'
        if (streetLine && streetLine.slice(-1) !== '/') streetLine += ' '; 
        streetLine += namePart;
    }

    if (streetLine.trim()) {
        displayParts.push(streetLine.trim());
    }

    // Part 2: Locality (City, State, Postcode)
    const localityLineParts: string[] = [];
    const city = addr.city ? String(addr.city).trim() : '';
    const state = addr.state ? String(addr.state).trim() : '';
    const postcode = addr.postcode ? String(addr.postcode).trim() : '';

    if (city) {
        localityLineParts.push(city);
    }

    let statePostcodePart = '';
    if (state) {
        statePostcodePart += state;
    }
    if (postcode) {
        if (statePostcodePart) statePostcodePart += ' ';
        statePostcodePart += postcode;
    }
    if (statePostcodePart) {
        localityLineParts.push(statePostcodePart);
    }
    
    if (localityLineParts.length > 0) {
        displayParts.push(localityLineParts.join(' ')); 
    }

    const country = addr.country ? String(addr.country).trim() : '';
    if (country) {
        displayParts.push(country);
    }

    return displayParts.join(', ');
  }

  // Map our address field names to Gmaps field names
  const componentMap: ComponentMap = {
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

      // For each Address component look to see if we have a mapping for it to our field names
      // Then map component
      if (place.addressComponents) {
        for (const component of place.addressComponents) {
          for (const type of component.types) {
            if (componentMap[type]) {
              if (type === 'administrative_area_level_1' && component.shortText) {
                newAddress[componentMap[type]] = component.shortText;
              } else {
                newAddress[componentMap[type]] = component.longText || component.shortText || '';
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

  let fieldState = $state<FieldState>(createFieldState());
</script>

<BaseInput
  {name}
  value={search}
  {fieldState}
  {formState}
  onChange={onChange}
  {required}
  {classes}
  {label}
  {showValidation}
  validationFunctions={[]}
>
    {#snippet input()}
    <div id="smart-forms-address-containter" class="address-container">
      <input
        bind:this={element}
        type="text"
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
          // Slight delay before hiding results
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
</BaseInput>

{#if incomplete}
  <p class="address-warning">Address is incomplete</p>
{/if}

<style>
</style>
