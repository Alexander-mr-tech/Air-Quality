import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import * as turf from "@turf/turf";

const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 30.3753, // Centering map on Pakistan
  lng: 69.3451,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const WeatherContourMap = () => {
  const [map, setMap] = useState(null);
  const [contourData, setContourData] = useState(null);

  const apiKey = "680b8cb55955b2fe1d1f2837cd8101ad"; // Your OpenWeather API Key

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCzYspelYKUX4XrSErkzfzQIA29KsRyvpI", // Your Google Maps API Key
    libraries,
  });

  // List of major cities in Pakistan
  const pakistanCities = [
    { name: "Karachi", lat: 24.8607, lon: 67.0011 },
    { name: "Lahore", lat: 31.5497, lon: 74.3436 },
    { name: "Islamabad", lat: 33.6844, lon: 73.0479 },
    { name: "Rawalpindi", lat: 33.5651, lon: 73.0169 },
    { name: "Peshawar", lat: 34.0151, lon: 71.5249 },
    { name: "Quetta", lat: 30.1798, lon: 66.975 },
    { name: "Faisalabad", lat: 31.4504, lon: 73.135 },
    { name: "Multan", lat: 30.1575, lon: 71.5249 },
    { name: "Sialkot", lat: 32.4927, lon: 74.5319 },
    { name: "Hyderabad", lat: 25.396, lon: 68.3578 },
    { name: "Gujranwala", lat: 32.1877, lon: 74.1945 },
    { name: "Sargodha", lat: 32.0836, lon: 72.671 },
    { name: "Bahawalpur", lat: 29.3956, lon: 71.6836 },
    { name: "Sukkur", lat: 27.7051, lon: 68.8574 },
    { name: "Mardan", lat: 34.198, lon: 72.0451 },
    { name: "Abbottabad", lat: 34.1463, lon: 73.2117 },
    { name: "Jhelum", lat: 32.9333, lon: 73.7333 },
    { name: "Sahiwal", lat: 30.6667, lon: 73.1 },
    { name: "Dera Ghazi Khan", lat: 30.0497, lon: 70.64 },
    { name: "Muzaffarabad", lat: 34.37, lon: 73.47 },
    { name: "Gilgit", lat: 35.9208, lon: 74.308 },
    { name: "Mingora", lat: 34.7755, lon: 72.3621 },
    { name: "Mirpur Khas", lat: 25.5276, lon: 69.0111 },
    { name: "Chitral", lat: 35.8504, lon: 71.7864 },
    { name: "Gwadar", lat: 25.1264, lon: 62.3235 },
    { name: "Khuzdar", lat: 27.8111, lon: 66.6104 },
    { name: "Shah Bandar", lat: 24.1556, lon: 67.9975 },
  ];

  // Function to fetch weather data from OpenWeather API
  const fetchWeatherData = async (locations) => {
    const promises = locations.map(({ lat, lon }) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      ).then((res) => res.json())
    );

    const weatherData = await Promise.all(promises);
    return weatherData;
  };

  // Function to generate contours using Turf.js interpolation
  const generateContours = (weatherData) => {
    const points = weatherData.map((data) =>
      turf.point([data.coord.lon, data.coord.lat], {
        temperature: data.main.temp,
      })
    );

    const featureCollection = turf.featureCollection(points);

    // Interpolating temperature data into contours
    const grid = turf.interpolate(featureCollection, 20, {
      gridType: "hex",
      property: "temperature",
      units: "kilometers",
    });

    return grid;
  };

  // Overlay contours on Google Maps
  const overlayContoursOnMap = (map, grid) => {
    map.data.addGeoJson(grid);

    // Styling the contours based on temperature
    map.data.setStyle((feature) => {
      const temperature = feature.getProperty("temperature");
      let color = "#0000FF";

      // Set different colors based on temperature
      if (temperature > 30) {
        color = "#FF0000"; // Red for hot areas
      } else if (temperature > 20) {
        color = "#FFA500"; // Orange for warm areas
      } else if (temperature > 10) {
        color = "#FFFF00"; // Yellow for mild areas
      } else {
        color = "#00FFFF"; // Cyan for cold areas
      }

      return {
        fillColor: color,
        strokeWeight: 1,
        fillOpacity: 0.5,
      };
    });
  };

  // Callback function when map loads
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Main function to fetch weather data and render contours on map
  useEffect(() => {
    if (map) {
      // Fetch weather data and generate contours
      fetchWeatherData(pakistanCities).then((data) => {
        const grid = generateContours(data);
        overlayContoursOnMap(map, grid);
        setContourData(grid);
      });
    }
  }, [map]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}
        options={options}
        onLoad={onMapLoad}
      />
    </div>
  );
};

export default WeatherContourMap;
