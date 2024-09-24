import React, { useState } from "react";
import WeatherComponent from "../components/weathercomponent";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

// Import environment variables
const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

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
  const [weather, setWeather] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const fetchWeather = async (lat, lng) => {
    if (!WEATHER_API_KEY) {
      setError("Weather API key is missing");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);
      setInfoWindowOpen(true);
    } catch (error) {
      setError("Failed to fetch weather data");
      console.error("Error fetching the weather data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (!lat || !lng) {
      console.error("Latitude or Longitude is missing.");
      return;
    }
    setSelectedPosition({ lat, lng });
    setWeather(null); // Reset weather data when a new location is clicked
    fetchWeather(lat, lng); // Fetch weather for the clicked location
  };

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(false);
    setWeather(null);
    setSelectedPosition(null);
  };

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        options={{
          restriction: {
            latLngBounds: bounds,
            strictBounds: true,
          },
          disableDefaultUI: false,
          draggable: true,
          zoomControl: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
          clickableIcons: true,
          fullscreenControl: false,
          
        }}
        onClick={handleMapClick} // Handle clicks on the map
      >
        {selectedPosition && <Marker position={selectedPosition} />}
        <Polygon
          paths={pakistanBoundaryCoords}
          options={{
            fillColor: "#73AD21",
            fillOpacity: 0.1,
            strokeColor: "#73AD21",
            strokeOpacity: 0.8,
            strokeWeight: 5,
            clickable: true,
            editable: false,
            draggable: false,
          }}
        />
        {infoWindowOpen && selectedPosition && (
          <InfoWindow
            position={selectedPosition}
            onCloseClick={handleInfoWindowClose}
            options={{ pixelOffset: new window.google.maps.Size(0, -40) }} // Adjusts the position of the InfoWindow
          >
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : weather ? (
              // Pass dynamic coordinates to the WeatherComponent
              <WeatherComponent
                lat={selectedPosition.lat}
                lon={selectedPosition.lng}
              />
            ) : (
              <div>Click on the map to see the weather.</div>
            )}
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
