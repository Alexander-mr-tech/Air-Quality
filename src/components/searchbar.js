import React, { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./SearchBar.css";

const SearchBar = () => {
  // State to manage form inputs
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");

  // Handlers to update state
  const handleLocationChange = (e) => setCurrentLocation(e.target.value);
  const handleDestinationChange = (e) => setDestination(e.target.value);

  // Handle search when the button is clicked
  const handleClick = () => {
    if (currentLocation && destination) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        currentLocation
      )}&destination=${encodeURIComponent(destination)}`;
      window.open(mapsUrl, "_blank");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="SearchBar-Content">
      <div className="SearchBar-Row">
        <h2>Select Your Destination</h2>
        <div>
          <label className="styled-label">Current Location</label>
          <input
            type="text"
            value={currentLocation}
            onChange={handleLocationChange}
            placeholder="Current Location"
            className="styled-input"
          />
          <br />
          <label className="styled-label">Your Destination</label>
          <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
            placeholder="Destination"
            className="styled-input"
          />
        </div>
      </div>
      <button onClick={handleClick} className="styled-button">
        Go
      </button>
    </div>
  );
};

export default SearchBar;
