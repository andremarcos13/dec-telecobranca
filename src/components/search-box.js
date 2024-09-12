// SearchBox.js
import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input, Button, Flex } from "@chakra-ui/react";

function SearchBox({ onPlaceSelected }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        onPlaceSelected(place);
      } else {
        console.log("Place does not have a geometry.");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleSearch = () => {
    onPlaceChanged();
  };

  return (
    <Flex mb="10px">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input
          type="text"
          placeholder="Search for places (e.g., hospitals)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={3}
          bg="white"
        />
      </Autocomplete>
      <Button onClick={handleSearch} ml="2">
        Search
      </Button>
    </Flex>
  );
}

export default SearchBox;
