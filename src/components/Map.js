import React from "react";
import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  position: "fixed",
  height: "90vh",
  border: "2px solid #73AD21",
  top: "10vh",
};

const center = {
  lat: 30.3753,
  lng: 69.3451,
};

const bounds = {
  north: 37.084107,
  south: 23.6345,
  east: 77.837451,
  west: 60.872972,
};

const pakistanBoundaryCoords = [
  { lat: 24.0, lng: 61.0 },
  { lat: 37.0, lng: 61.0 },
  { lat: 37.0, lng: 78.0 },
  { lat: 24.0, lng: 78.0 },
  { lat: 24.0, lng: 61.0 },
];

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAo_mqWaTaovIAeSAUFCI9lBNNIwxx6_bE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        options={{
          restriction: {
            latLngBounds: bounds,
            strictBounds: true,
          },
        }}
      >
        <Marker position={center} />
        <Polygon
          paths={pakistanBoundaryCoords}
          options={{
            fillColor: "#73AD21",
            fillOpacity: 0.1,
            strokeColor: "#73AD21",
            strokeOpacity: 0.8,
            strokeWeight: 5,
            clickable: false,
            editable: false,
            draggable: false,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
