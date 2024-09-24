import React, { useState } from "react";
import "../components/Sidebar.css";
import SearchBar from "../components/searchbar"; 
import logo from "../images/logo.png";
import wind from "../images/windspeed.png";
import wind_direction from "../images/wind_direction.png";
import temperature from "../images/temperature.png";
import humidity from "../images/humidity.png";
import firespread from "../images/fire_spread.png";

function Sidebar() {
  const [windSpeedChecked, setWindSpeedChecked] = useState(false);
  const [windDirectionChecked, setWindDirectionChecked] = useState(false);
  const [temperatureChecked, setTemperatureChecked] = useState(false);
  const [humidityChecked, setHumidityChecked] = useState(false);
  const [fireSpreadChecked, setFireSpreadChecked] = useState(false);
  const [fireHotSpotsChecked, setFireHotSpotsChecked] = useState(false);

  return (
    <div>
      <div className="sidebar">
        <div className="Sidebar-Header">
          <img src={logo} alt="Logo" />
          <h2>Pakistan Forest Observatory</h2>
        </div>
        <div className="scroll_bar">
          <SearchBar />
          <div className="Sidebar-Content">
            <div className="Sidebar-Col">
              <div>
                <img src={wind} alt="Wind" />
                <h2>Wind Speed</h2>
                <br />
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={windSpeedChecked}
                  onChange={(e) => setWindSpeedChecked(e.target.checked)}
                />
              </div>
              <div>
                <img src={wind_direction} alt="Wind Direction" />
                <h2>Wind Direction</h2>
                <br />
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={windDirectionChecked}
                  onChange={(e) => setWindDirectionChecked(e.target.checked)}
                />
              </div>
              <div>
                <img src={temperature} alt="Temperature" />
                <h2>Temperature</h2>
                <br />
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={temperatureChecked}
                  onChange={(e) => setTemperatureChecked(e.target.checked)}
                />
              </div>
              <div>
                <img src={humidity} alt="Humidity" />
                <h2>Humidity</h2>
                <br />
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={humidityChecked}
                  onChange={(e) => setHumidityChecked(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div className="Sidebar-Content">
            <div className="Sidebar-Col">
              <div>
                <img src={firespread} alt="Fire Spread" />
                <h2>Fire Spread</h2>
                <br />
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={fireSpreadChecked}
                  onChange={(e) => setFireSpreadChecked(e.target.checked)}
                />
              </div>
              <div>
                <img src={wind_direction} alt="Fire Hot Spots" />
                <h2>Fire Hot Spots</h2>
                <br />
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={fireHotSpotsChecked}
                  onChange={(e) => setFireHotSpotsChecked(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
