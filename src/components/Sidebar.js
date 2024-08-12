import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../images/logo.png";
import wind from "../images/windspeed.png";
import wind_direction from "../images/wind_direction.png";
import temperature from "../images/temperature.png";
import humidity from "../images/humidity.png";
import firespread from "../images/fire_spread.png";

function Sidebar() {
  const [sliderValue, setSliderValue] = useState(50);
  const [isChecked, setIsChecked] = useState(false);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div>
      <div className="sidebar">
        <div className="Sidebar-Header">
          <img src={logo} alt="Logo" />
          <h3>
            Forest Fire Predication & <br />
            Spread Visualization
          </h3>
        </div>
        <div className="scroll_bar">
          <div className="Sidebar-Content">
            <div className="Sidebar-Col">
              <div>
                <img src={wind} alt="Wind" />
                <h2>Wind Speed</h2>
              </div>
              <div>
                <img src={wind_direction} alt="Wind Direcation" />
                <h2>Wind Direction</h2>
              </div>
              <div>
                <img src={temperature} alt="Temperature" />
                <h2>Temperature</h2>
              </div>
              <div>
                <img src={humidity} alt="Humidity" />
                <h2>Humidity</h2>
              </div>
            </div>
            <div className="Sidebar-Row">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
              />
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>Click to Show all Parameters</label>
            </div>
          </div>
          <div className="Sidebar-Content">
            <div className="Sidebar-Col">
              <div>
                <img src={firespread} alt="Fire Spread" />
                <h2>Fire Spread</h2>
              </div>
              <div>
                <img src={wind_direction} alt="Fire Hot Spots" />
                <h2>Fire Hot Spots</h2>
              </div>
              <div>
                <img src={temperature} alt="Logo" />
                <h2>Temperature</h2>
              </div>
              <div>
                <img src={humidity} alt="Logo" />
                <h2>Humidity</h2>
              </div>
            </div>
            <div className="Sidebar-Row">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
              />
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>Click to Show all Parameters</label>
            </div>
          </div>
          <div className="Sidebar-Content">
            <div className="Sidebar-Col">
              <div>
                <img src={firespread} alt="Fire Spread" />
                <h2>Fire Spread</h2>
              </div>
              <div>
                <img src={wind_direction} alt="Fire Hot Spots" />
                <h2>Fire Hot Spots</h2>
              </div>
              <div>
                <img src={temperature} alt="Logo" />
                <h2>Temperature</h2>
              </div>
              <div>
                <img src={humidity} alt="Logo" />
                <h2>Humidity</h2>
              </div>
            </div>
            <div className="Sidebar-Row">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
              />
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>Click to Show all Parameters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
