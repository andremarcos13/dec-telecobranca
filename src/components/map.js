// Map.js
import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Header from "./header";
import { Box, Center } from "@chakra-ui/react";
import SearchBox from "./search-box";

const containerStyle = {
  width: "80vw",
  height: "80vh",
};

const center = {
  lat: -21.391851978980352,
  lng: -45.51758864750582,
};

function Map() {
  const [mapCenter, setMapCenter] = useState(center);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);

  const handlePlaceSelected = (place) => {
    const location = place.geometry.location;
    setMapCenter({ lat: location.lat(), lng: location.lng() });
  };

  const handlePlacesChanged = () => {
    // No longer necessary as the autocompletion is handled in SearchBox
  };

  return (
    <Box
      bg="rgba(0,0,0,0.1)"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      width="100vw"
      height="100vh"
    >
      <Header />
      <Center>
        <Box mt="50px">
          <LoadScript googleMapsApiKey="" libraries={["places"]}>
            <SearchBox onPlaceSelected={handlePlaceSelected} />
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={18}
              onLoad={(map) => (mapRef.current = map)}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: marker.geometry.location.lat(),
                    lng: marker.geometry.location.lng(),
                  }}
                  onClick={() => setSelectedPlace(marker)}
                />
              ))}
              {selectedPlace && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.geometry.location.lat(),
                    lng: selectedPlace.geometry.location.lng(),
                  }}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div>
                    <h2>{selectedPlace.name}</h2>
                    <p>{selectedPlace.vicinity}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </Box>
      </Center>
    </Box>
  );
}

export default React.memo(Map);
