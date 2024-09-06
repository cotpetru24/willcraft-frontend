import React, { useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Form from 'react-bootstrap/Form';


const libraries = ['places'];

const AddressAutocomplete = ({ name, value, onPlaceSelected, handleInputChange }) => {

  const inputRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !loadError && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'uk' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onPlaceSelected(place.formatted_address);
        }
      });
    }
  }, [isLoaded, loadError, onPlaceSelected]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <Form.Control
      required
      type="text"
      ref={inputRef}
      name={name}
      value={value}
      onChange={handleInputChange}
      placeholder="Enter a UK address"
      className="custom-input"
    />
  );
};


export default AddressAutocomplete;
