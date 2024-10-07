import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import * as turf from "@turf/turf"; // Turf.js for geospatial operations

const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 30.3753, // Centering map on Pakistan
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

const apiKey = "680b8cb55955b2fe1d1f2837cd8101ad"; // OpenWeather API key

const WeatherContourMap = () => {
  const [map, setMap] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null); // State for the selected district to show temperature info

  // Load the Google Maps API asynchronously
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCzYspelYKUX4XrSErkzfzQIA29KsRyvpI", // Replace with your Google Maps API key
    libraries,
    async: true,
    defer: true,
    version: "weekly",
  });

  // Fetch GeoJSON data from public folder
  const fetchGeojsonData = async () => {
    try {
      const response = await fetch("/Pakistan map.json"); // Fetch from public/csv/
      const data = await response.json();
      setGeojsonData(data); // Store the GeoJSON data in state
    } catch (error) {
      console.error("Error fetching GeoJSON:", error);
    }
  };

  // Fetch weather data for each district using the district centroid
  const fetchWeatherData = async (districts) => {
    const promises = districts.map((district) => {
      const centroid = turf.centroid(district.geometry); // Calculate centroid of the district
      const [lon, lat] = centroid.geometry.coordinates;

      // Fetch weather data for each district's centroid
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => ({
          district: district.properties.NAME_1, // Assuming NAME_1 represents district name
          temperature: data.main.temp,
          lat,
          lon,
        }));
    });

    return Promise.all(promises);
  };

  // Function to style districts based on temperature
  const styleDistricts = (mapInstance, districts, weatherData) => {
    districts.features.forEach((district) => {
      const districtWeather = weatherData.find(
        (data) => data.district === district.properties.NAME_1 // Match weather data to the district
      );

      if (districtWeather) {
        // Add district boundaries to the map
        mapInstance.data.addGeoJson(district);

        // Style district based on temperature
        mapInstance.data.setStyle((feature) => {
          const temperature = districtWeather.temperature;
          let color = "#00FFFF"; // Default cool color

          // Adjust color based on temperature range
          if (temperature > 30) {
            color = "#FF0000"; // Red for hot areas
          } else if (temperature > 20) {
            color = "#0000CD"; // Medium Blue for warm areas
          } else if (temperature > 10) {
            color = "#00B000"; // Dark Green for mild areas
          } else {
            color = "#00FFFF"; // Cyan for cold areas
          }

          return {
            fillColor: color,
            strokeColor: "#000000", // Black stroke color for the border
            strokeOpacity: 1, // Full opacity for the dashed line
            strokeWeight: 0.1, // Adjust the thickness of the stroke
            fillOpacity: 0.1, // Fill opacity of the districts
          };
        });
      }
    });
  };

  // Main function to fetch weather data and style districts
  useEffect(() => {
    if (map && geojsonData) {
      const districts = geojsonData.features; // Get districts from GeoJSON

      // Fetch weather data for districts and style the map
      fetchWeatherData(districts).then((weatherData) => {
        setWeatherData(weatherData); // Save weather data in state
        styleDistricts(map, geojsonData, weatherData);
      });
    }
  }, [map, geojsonData]);

  // Map load callback
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    fetchGeojsonData(); // Fetch GeoJSON data once the map is loaded
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
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
          mapTypeId: "roadmap", // Could also be "roadmap", "satellite", "terrain", or "hybrid"
        }}
        onLoad={onMapLoad}
      />

      {weatherData.map((district, index) => (
        <Marker
          key={`${district.district}-${index}`} // Ensure the key is unique by using district name and index
          position={{ lat: district.lat, lng: district.lon }}
          onClick={() => {
            console.log(`Clicked on ${district.district}`); // Log to verify click event
            setSelectedDistrict(district);
          }}
        />
      ))}

      {selectedDistrict && (
        <InfoWindow
          position={{ lat: selectedDistrict.lat, lng: selectedDistrict.lon }}
          onCloseClick={() => setSelectedDistrict(null)}
        >
          <div>
            <h2>{selectedDistrict.district}</h2>
            <p>Temperature: {selectedDistrict.temperature} °C</p>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

export default WeatherContourMap;
