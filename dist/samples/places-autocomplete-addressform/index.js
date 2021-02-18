// [START maps_places_autocomplete_addressform]
// This sample uses the Places Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let autocomplete;
let address1Field;
let address2Field;
let postalField;
const componentFields = [
  "address2",
  "locality",
  "administrative_area_level_1",
  "postal_code",
  "country",
];
const componentLength = {
  street_number: "long_name",
  route: "short_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  postal_code: "long_name",
  postal_code_suffix: "long_name",
  country: "long_name",
};

function initAutocomplete() {
  address1Field = document.querySelector("#gmp-a1");
  address2Field = document.querySelector("#address2");
  postalField = document.querySelector("#postal_code");
  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us", "ca"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

// [START maps_places_autocomplete_addressform_fillform]
function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (const component of place.address_components) {
    const addressType = component.types[0];

    switch (addressType) {
      case "street_number": {
        address1 = component[componentLength[addressType]] + " " + address1;
        break;
      }

      case "route": {
        address1 += component[componentLength[addressType]];
        break;
      }

      case "postal_code": {
        postcode = component[componentLength[addressType]] + postcode;
        break;
      }

      case "postal_code_suffix": {
        postcode += "-" + component[componentLength[addressType]];
        break;
      }

      default: {
        if (componentLength[addressType]) {
          const val = component[componentLength[addressType]];
          document.getElementById(addressType).value = val;
        }
        break;
      }
    }
  }
  address1Field.value = address1;
  postalField.value = postcode;

  // Enable the rest of the address form fields
  for (const component of componentFields) {
    document.getElementById(component).disabled = false;
  }
  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  address2Field.placeholder = "Apartment, unit, or floor #";
  address2Field.focus();
}
// [END maps_places_autocomplete_addressform_fillform]
// [END maps_places_autocomplete_addressform]
