import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
  InfoWindow,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Input,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import WeatherComponent from "../components/weathercomponent";

// Import environment variables
const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

// Define the libraries array outside the component
const libraries = ["places"];

const containerStyle = {
  width: "100%",
  position: "fixed",
  height: "90vh",
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
  const [weatherPreferences, setWeatherPreferences] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [weather, setWeather] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();
  const [map, setMap] = useState(null); // Store the map instance

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
    const latLng = event.latLng; // Get the latLng object
    if (!latLng) {
      console.error("Latitude or Longitude is missing.");
      return;
    }
    const lat = latLng.lat(); // Get latitude
    const lng = latLng.lng(); // Get longitude
    if (lat == null || lng == null) {
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

  const calculateRoute = async () => {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={libraries}>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          <Sidebar setWeatherPreferences={setWeatherPreferences} />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={(mapInstance) => setMap(mapInstance)} // Store the map instance
            options={{
              restriction: {
                latLngBounds: bounds,
                strictBounds: true,
              },
              draggable: true,
              scrollwheel: true,
              clickableIcons: true,
              streetViewControl: false,
              mapTypeControl: false,
              disableDefaultContextMenu: false,
            }}
            onClick={handleMapClick} // Handle clicks on the map
          >
            {selectedPosition && <Marker position={selectedPosition} />}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            <Polygon
              paths={pakistanBoundaryCoords}
              options={{
                fillColor: "#73AD21",
                fillOpacity: 0.1,
                strokeColor: "#73AD21",
                strokeOpacity: 0.8,
                strokeWeight: 5,
              }}
            />
            {infoWindowOpen && selectedPosition && (
              <InfoWindow
                position={selectedPosition}
                onCloseClick={handleInfoWindowClose}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -40), // Adjusts the position of the InfoWindow
                }}
              >
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : weather ? (
                  <WeatherComponent
                    lat={selectedPosition.lat}
                    lon={selectedPosition.lng}
                    weather={weather}
                    weatherPreferences={weatherPreferences}
                  />
                ) : (
                  <div>No weather data available</div>
                )}
              </InfoWindow>
            )}
          </GoogleMap>
        </Box>

        {/* Conditionally Render the Box */}
        {isVisible && (
          <Box
            p={4}
            borderRadius="lg"
            borderColor="black"
            m={2}
            bgColor="white"
            shadow="base"
            width="650px"
            height="120px"
            zIndex="1"
          >
            <HStack spacing={2} justifyContent="space-between">
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input type="text" placeholder="Origin" ref={originRef} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input
                    type="text"
                    placeholder="Destination"
                    ref={destinationRef}
                  />
                </Autocomplete>
              </Box>

              <ButtonGroup>
                <Button onClick={calculateRoute}>Calculate Route</Button>
                <IconButton
                  aria-label="clear route"
                  icon={<FaTimes />}
                  onClick={clearRoute}
                />
              </ButtonGroup>
            </HStack>
            <HStack spacing={4} mt={4} justifyContent="space-between">
              <Text>Distance: {distance}</Text>
              <Text>Duration: {duration}</Text>
              <IconButton
                aria-label="center map"
                icon={<FaLocationArrow />}
                isRound
                onClick={() => {
                  if (map) {
                    map.panTo(center);
                    map.setZoom(5);
                  }
                }}
              />
            </HStack>
          </Box>
        )}
        {/* Toggle Button */}
        <Button
          onClick={() => setIsVisible(!isVisible)}
          background="white"
          m={2}
          position="static" // Fixed positioning
          zIndex="2" // Ensure it appears above other elements
          textColor="black"
          fontWeight="bold"
        >
          {isVisible ? "Hide Direction" : "Show Direction"}
        </Button>
      </Flex>
    </LoadScript>
  );
};

export default Map;
