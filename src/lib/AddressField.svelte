<script>
    import { onMount } from 'svelte';
    import TextInput from '$lib/TextInput.svelte';
    import clonedeep from 'lodash.clonedeep';
    
    export let address = {
        'formatted': ''
    };
    export let label = 'Address';
    export let form_validator = null;
    export let required = false;
    export let on_change = () => {};
    export let classes = 'standard-input';
    export let name = 'null';
    export let mailing = false;

    let element = null;

    let search = '';

    let all_changes = () => {};
    
    let show_full_address = false;
    function showFullAddress() { show_full_address = !show_full_address };

    const options = {
        types: [],
        componentRestrictions: { country: 'au' },
    };

    function format_address(address) {
        if (!address || !address.street_number || !address.street_name || !address.city || !address.state || !address.postcode || !address.country) {
            return '';
        }

        let s = '';

        if (address.unit_number) {
            s += `${address.unit_number}/`;
        }

        let country = address.country;

        if (country === 'AU') {
            country = 'Australia';
        }

        s += `${address.street_number} ${address.street_name}, ${address.city} ${address.state} ${address.postcode}`;

        return s;
        
    }
    
    const empty_address = {
        unit_number: '',
        street_number: '',
        street_name: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        po_box: '',
    };

    const component_map = {
        street_number: 'street_number',
        route: 'street_name',
        locality: 'city',
        country: 'country',
        administrative_area_level_1: 'state',
        postal_code: 'postcode',
        subpremise: 'unit_number',
    };

    onMount( async () => {
        
        all_changes = () => {
            on_change();
            //field_validator.dirty = value == field_validator.initial_value;
        }

        if (typeof google !== 'undefined') {

            let gPlace = new google.maps.places.Autocomplete(element, options);

            google.maps.event.addListener(
                gPlace,
                'place_changed',
                function () {
                    let place = gPlace.getPlace();
                    let new_address = clonedeep(empty_address);
                    search = '';

                    for (let component of place.address_components) {
                        const addressType = component.types[0];
                        if (component_map[addressType]) {
                            new_address[component_map[addressType]] = component.short_name;
                        }
                    }

                    address = new_address;
                }
            );
        }
    })

</script>

<div >
    <div class="standard-input-label" style="display: flex; justify-content: space-between">
        {#if label}
        <label for={name}>{label}
            {#if required}
            <span style="color: #ce0262">*</span>
            {/if}
        </label>
        {/if}
        <i class="fa {show_full_address ? 'fa-chevron-up' : 'fa-chevron-down'} cursor-pointer" on:click={showFullAddress}></i>
    </div>

    <input
        bind:this={element}
        class={classes}
        placeholder="Search..."
        name="{name}"
        type="text"
        bind:value="{search}"
        on:keyup={all_changes}
    />

    {#if !show_full_address}
    <div>
        <p>{format_address(address)}</p>
    </div>
    {/if}

    <!-- TODO get required error from from controller
    {#if show_full_address && missingFields() ($form_validator.$submitted || $form_validator[name].touched) }
    <div class="text-sm">
        <div class="text-primary">This is required</div>
    </div>
    {/if}
    -->

    {#if show_full_address}
    <div>
        {#if mailing}        
        <div class="row">
            <div class="col-4">
                <TextInput 
                    name={name+'_name'} 
                    label={'Name'} 
                    bind:value={address.first_name} 
                    form_validator={form_validator}
                ></TextInput>
            </div>
            <div class="col-4">
                <TextInput 
                    name={name+'_role'} 
                    label={'Role'} 
                    bind:value={address.role} 
                    form_validator={form_validator}
                ></TextInput>
            </div>
            <div class="col-4">
                <TextInput 
                    name={name+'_company_name'} 
                    label={'Company Name'} 
                    bind:value={address.company_name} 
                    form_validator={form_validator}
                ></TextInput>
            </div>
        </div>
        
        {/if}
    
        <div class="row">
            <div class="col-2">
                <TextInput 
                    name={name+'_unit_number'} 
                    label={'Unit #'} 
                    bind:value={address.unit_number} 
                    form_validator={form_validator}
                ></TextInput>
            </div>
            <div class="col-2">
                <TextInput 
                    name={name+'_street_number'} 
                    label={'Street #'} 
                    bind:value={address.street_number} 
                    form_validator={form_validator}
                ></TextInput>
            </div>
            <div class="col-8">
                <TextInput 
                    name={name+'_street_name'} 
                    label={'Street Name'} 
                    bind:value={address.street_name} 
                    form_validator={form_validator}
                ></TextInput>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <TextInput 
                    name={name+'_city'} 
                    label={'City'} 
                    bind:value={address.city} 
                    form_validator={form_validator}
                ></TextInput>
            </div>

            <div class="col-2">
                <TextInput 
                    name={name+'_state'}
                    label={'State'}
                    type={'select'}
                    options={['NSW', 'VIC', 'QLD', 'NT', 'WA', 'SA', 'ACT', 'TAS']}
                    bind:value={address.state}
                    required=true
                    form_validator={form_validator}>
                </TextInput>
            </div>
            <div class="col-3">
                <TextInput 
                    name={name+'_postcode'} 
                    label={'Postcode'} 
                    bind:value={address.postcode} 
                    form_validator={form_validator}
                ></TextInput>
            </div>
            <div class="col-2">
                <TextInput 
                    name={name+'_country'}
                    label={'Country'}
                    type={'select'}
                    options={['AU']}                     
                    bind:value={address.country}
                    required=true
                    form_validator={form_validator}>
                </TextInput>
                
            </div>
        </div>
    </div>
    {/if}
</div>


<style></style>