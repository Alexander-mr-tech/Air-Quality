import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Papa from "papaparse";
import fire from "../images/fire.png";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const FireHeatMap = ({ showMarkers }) => {
  const [markerData, setMarkerData] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // Track if Google Maps API has loaded
  // Track if markers should be shown

  const handleOnLoad = () => {
    console.log("Google Maps API loaded");
    setIsMapLoaded(true); // Set the flag to true once the API has loaded
  };

  useEffect(() => {
    if (!isMapLoaded) return; // Only run the effect after Google Maps API has loaded

    console.log("Fetching and parsing CSV data...");

    // Fetch and parse the CSV file from the public folder
    fetch("/firedata.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log("Parsed CSV data: ", result.data); // Debugging CSV data

            const fireData = result.data.map((item) => ({
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
              brightness: parseFloat(item.brightness),
            }));

            console.log("Marker data: ", fireData); // Debugging marker data

            setMarkerData(fireData); // Set the parsed data for markers
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching or parsing the CSV file: ", error);
      });
  }, [isMapLoaded]); // Ensure the effect depends on the `isMapLoaded` state

  const mapContainerStyle = {
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

  return (
    <>
      {/* Checkbox for toggling markers */}
      <div
        style={{
          position: "absolute",
          top: "10vh",
          left: "10px",
          zIndex: 1000,
        }}
      ></div>

      <LoadScript
        googleMapsApiKey={MAP_API_KEY}
        onLoad={handleOnLoad} // Register the onLoad callback
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
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
            mapTypeId: "hybrid", // Could also be "roadmap" "satellite", "terrain", or "hybrid"
          }}
        >
          {/* Conditionally render the markers based on the showMarkers state */}
          {showMarkers &&
            markerData.length > 0 &&
            markerData.map((item, index) => (
              <Marker
                key={index}
                position={{ lat: item.latitude, lng: item.longitude }}
                icon={{
                  url: fire, // Path to the custom fire image
                  scaledSize: new window.google.maps.Size(30, 30), // Scale the icon
                }}
              />
            ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default FireHeatMap;
