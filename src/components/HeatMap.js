// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, HeatmapLayer } from "@react-google-maps/api";
// import Papa from "papaparse";

// const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// const FireHeatMap = () => {
//   const [heatmapData, setHeatmapData] = useState([]);
//   const [isMapLoaded, setIsMapLoaded] = useState(false); // Track if Google Maps API has loaded

//   const handleOnLoad = () => {
//     console.log("Google Maps API loaded");
//     setIsMapLoaded(true); // Set the flag to true once the API has loaded
//   };

//   useEffect(() => {
//     if (!isMapLoaded) return; // Only run the effect after Google Maps API has loaded

//     console.log("Fetching and parsing CSV data...");

//     // Fetch and parse the CSV file from the public folder
//     fetch("/firedata.csv")
//       .then((response) => response.text())
//       .then((csvData) => {
//         Papa.parse(csvData, {
//           header: true,
//           skipEmptyLines: true,
//           complete: (result) => {
//             console.log("Parsed CSV data: ", result.data); // Debugging CSV data

//             const fireData = result.data.map((item) => ({
//               location: new window.google.maps.LatLng(
//                 parseFloat(item.latitude),
//                 parseFloat(item.longitude)
//               ),
//               weight: parseFloat(item.brightness),
//             }));

//             console.log("Heatmap data: ", fireData); // Debugging heatmap data

//             setHeatmapData(fireData); // Set the parsed data
//           },
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching or parsing the CSV file: ", error);
//       });
//   }, [isMapLoaded]); // Ensure the effect depends on the `isMapLoaded` state

//   const mapContainerStyle = {
//     width: "100%",
//     position: "fixed",
//     height: "90vh",
//   };

//   const center = {
//     lat: 30.3753,
//     lng: 69.3451,
//   };
//   const bounds = {
//     north: 37.084107,
//     south: 23.6345,
//     east: 77.837451,
//     west: 60.872972,
//   };
//   const pakistanBoundaryCoords = [
//     { lat: 24.0, lng: 61.0 },
//     { lat: 37.0, lng: 61.0 },
//     { lat: 37.0, lng: 78.0 },
//     { lat: 24.0, lng: 78.0 },
//     { lat: 24.0, lng: 61.0 },
//   ];
//   return (
//     <LoadScript
//       googleMapsApiKey={MAP_API_KEY}
//       libraries={["visualization"]}
//       onLoad={handleOnLoad} // Register the onLoad callback
//     >
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={5}
//         options={{
//           restriction: {
//             latLngBounds: bounds,
//             strictBounds: true,
//           },
//           draggable: true,
//           scrollwheel: true,
//           clickableIcons: true,
//           streetViewControl: false,
//           mapTypeControl: false,
//           disableDefaultContextMenu: false,
//           mapTypeId: "hybrid", // Could also be "roadmap" "satellite", "terrain", or "hybrid"
//         }}
//       >
//         {heatmapData.length > 0 && (
//           <HeatmapLayer
//             data={heatmapData}
//             options={{
//               radius: 20,
//               opacity: 0.7,
//               gradient: [
//                 "rgba(255, 0, 0, 0)", // Transparent
//                 "rgba(255, 102, 102, 1)", // Lighter red
//                 "rgba(255, 51, 51, 1)", // Medium red
//                 "rgba(255, 0, 0, 1)", // Full opaque red
//               ],
//             }}
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default FireHeatMap;


