import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
  InfoWindow,
  DirectionsRenderer,
  Autocomplete,
  HeatmapLayer,
} from "@react-google-maps/api";
import Papa from "papaparse";
import fire from "../images/fire.png";
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
  Checkbox,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import WeatherComponent from "../components/weathercomponent";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const libraries = ["places", "visualization"];

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

const CombinedMap = ({ weatherPreferences }) => {
  const [markerData, setMarkerData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [weather, setWeather] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();
  const [map, setMap] = useState(null);

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
    const latLng = event.latLng;
    if (!latLng) {
      console.error("Latitude or Longitude is missing.");
      return;
    }
    const lat = latLng.lat();
    const lng = latLng.lng();
    if (lat == null || lng == null) {
      console.error("Latitude or Longitude is missing.");
      return;
    }
    setSelectedPosition({ lat, lng });
    setWeather(null);
    fetchWeather(lat, lng);
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

  const handleOnLoad = () => {
    console.log("Google Maps API loaded");
    setIsMapLoaded(true);
  };

  useEffect(() => {
    if (!isMapLoaded) return;

    // Fetch and parse the CSV data
    fetch("/firedata.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const fireData = result.data.map((item) => ({
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
              brightness: parseFloat(item.brightness),
            }));
            setMarkerData(fireData);
            setHeatmapData(
              fireData.map((item) => ({
                location: new window.google.maps.LatLng(
                  item.latitude,
                  item.longitude
                ),
                weight: item.brightness,
              }))
            );
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching or parsing the CSV file: ", error);
      });
  }, [isMapLoaded]);

  return (
    <LoadScript
      googleMapsApiKey={MAP_API_KEY}
      onLoad={handleOnLoad}
      libraries={libraries}
    >
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={(mapInstance) => setMap(mapInstance)}
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
              mapTypeId: "hybrid",
            }}
            onClick={handleMapClick}
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
                  pixelOffset: new window.google.maps.Size(0, -40),
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
            {showMarkers &&
              markerData.length > 0 &&
              markerData.map((item, index) => (
                <Marker
                  key={index}
                  position={{ lat: item.latitude, lng: item.longitude }}
                  icon={{
                    url: fire,
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              ))}
            {showHeatmap && heatmapData.length > 0 && (
              <HeatmapLayer
                data={heatmapData}
                options={{
                  radius: 20,
                  opacity: 0.7,
                  gradient: [
                    "rgba(255, 0, 0, 0)",
                    "rgba(255, 102, 102, 1)",
                    "rgba(255, 51, 51, 1)",
                    "rgba(255, 0, 0, 1)",
                  ],
                }}
              />
            )}
          </GoogleMap>
        </Box>
        <Box p={4} zIndex="2" bgColor="white" position="fixed" top={4} left={4}>
          <Checkbox
            isChecked={showMarkers}
            onChange={(e) => setShowMarkers(e.target.checked)}
          >
            Show Fire Hotspots
          </Checkbox>
          <Checkbox
            isChecked={showHeatmap}
            onChange={(e) => setShowHeatmap(e.target.checked)}
          >
            Show Heatmap
          </Checkbox>
        </Box>
      </Flex>
    </LoadScript>
  );
};

export default CombinedMap;
