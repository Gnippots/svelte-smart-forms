<script lang="ts">
    import { run } from 'svelte/legacy';

    import { onMount } from 'svelte';
    import {BaseInput, TextInput, Dropdown, FieldErrors} from './';
    import clonedeep from 'lodash.clonedeep';
    
    interface Props {
        address?: any;
        label?: string;
        formState?: any;
        required?: any;
        on_change?: any;
        classes?: string;
        name?: string;
        show_search?: boolean;
        mailing?: boolean;
    }

    let {
        address = $bindable({
        'formatted': ''
    }),
        label = 'Address',
        formState = null,
        required = {},
        on_change = () => {},
        classes = 'smart-form-input',
        name = 'null',
        show_search = true,
        mailing = false
    }: Props = $props();

    let element = $state(null);
    let incomplete = $state(false);
    let formatted_address = $state('');
    let search = $state('');

    let all_changes = $state(() => {});
    
    let show_full_address = $state(false);

    const options = {
        types: [],
        componentRestrictions: { country: 'au' },
    };

    function is_required(field: any) {
        if (required.all || required[field]) {return true}
    }

    run(() => {
        let fields = ['street_number', 'street_name', 'city', 'state', 'postcode', 'country'];
        if (mailing) {
            fields = fields.concat(['first_name', 'role', 'company_name'])
        }
        
        incomplete = false;
        
        fields.forEach( field => {
            if (!address[field] && is_required(field)) {                
                incomplete = true
            }
        })

        if (incomplete) {
            formatted_address = '';
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

        formatted_address =  s;
    });    
    
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
            //fieldState.dirty = value == fieldState.initial_value;
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

    run(() => {
        if (!show_search) {
            show_full_address = true;
        }
    });

</script>

<BaseInput
    name={name}
    bind:value={search}
    formState={formState}
    on_change={on_change}
>
    {#snippet label()}
        <div class="smart-form-input-label" style="display: flex; justify-content: space-between" >
            {#if label}
            <label for={name}>{label}
                {#if required}
                <span style="color: #ce0262">*</span>
                {/if}
            </label>
            {/if}
            <button type="button" class="cursor-pointer" onclick={() => {show_full_address = !show_full_address }}> Show full address</button>
        </div>
    {/snippet}
    
    <input
        bind:this={element}
        class={classes}
        placeholder="Search..."
        name="{name}"
        bind:value="{search}"
        onkeyup={all_changes}
    />
</BaseInput>

{#if !show_full_address}
<div>
    {#if incomplete}
    <p class="smart-form-formatted-address">Address is incomplete</p>
    {:else}
    <p class="">{formatted_address}</p>
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