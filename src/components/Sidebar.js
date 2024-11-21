import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import "../components/Sidebar.css";
import wind from "../images/windspeed.png";
import weather from "../images/weather.png";
import Visibility from "../images/visiblity.png";
import Pressure from "../images/pressure.png";
import Feel from "../images/feel.png";
import wind_direction from "../images/wind_direction.png";
import temperature from "../images/temperature.png";
import humidity from "../images/humidity.png";
import firehotspot from "../images/firehotspot.png";
import HeatMap from "../images/heatmap.png";
import firespread from "../images/firespread.png";
import StreetView from "../images/street-view.png";
import SatelliteView from "../images/satellite.png";
import ConpoyCover from "../images/Conopy_Cover.png";
import ConpoyHeight from "../images/Conopy_Height.png";
import ConpoyBaseHeight from "../images/Conopy_Base_Height.png";
import ConpoyBulkDensity from "../images/Conopy_Bulk_Height.png";
import ConpoyLayerCount from "../images/Conopy_Layers.png";
import SmokeSensor from "../images/smoke_sensor.png";
import GasSensor from "../images/gas_sensor.png";
import {
  Select, // Import Select here
} from "@chakra-ui/react";

function Sidebar({
  fireHotSpotsChecked,
  setFireHotSpotsChecked,
  setWeatherPreferences,
}) {
  const [sensorData, setSensorData] = useState(null); //firebase
  const [isOpen, Drawer] = useState(false); // Drawer
  const [isWeatherDropdown, weatherDropdownOpen] = useState(false); // Weather Drop Down
  const [isMapDropdown, MapDropdownOpen] = useState(false); // Map Drop Down
  const [isFireSpreadDropdown, FireSpreadDropdownOpen] = useState(false); // Fire Drop Down
  const [isConopyDropdown, ConopyDropdownOpen] = useState(false); // Fire Drop Down
  const [isSensersDropdown, SensorsDropdownOpen] = useState(false); // Sensors Drop Down

  // Weather Perameters
  const [temperatureChecked, setTemperatureChecked] = useState(true);
  const [humidityChecked, setHumidityChecked] = useState(true);
  const [windSpeedChecked, setWindSpeedChecked] = useState(true);
  const [windDirectionChecked, setWindDirectionChecked] = useState(true);
  const [weatherChecked, setWeatherChecked] = useState(true);
  const [feelChecked, setFeelChecked] = useState(true);
  const [pressureChecked, setPressureChecked] = useState(true);
  const [visibilityChecked, setVisibilityChecked] = useState(true);
  // Map Perameters
  const [defaultMapChecked, setdefaultMapChecked] = useState(false);
  const [satelliteViewChecked, setsatelliteViewChecked] = useState(false);
  const [streetViewChecked, setstreetViewChecked] = useState(false);
  const [hybridViewChecked, sethybridViewChecked] = useState(false);
  // Fire Perameters
  // const [fireHotSpotsChecked, setFireHotSpotsChecked] = useState(false);
  const [fireHeatMapChecked, setFireHeatMapChecked] = useState(false);
  const [fireSpreadChecked, setFireSpreadChecked] = useState(false);
  // Conopy Perameters
  const [ConpoyCoverChecked, setConpoyCoverChecked] = useState(false);
  const [ConpoyHeightChecked, setConpoyHeightChecked] = useState(false);
  const [ConpoyBaseHeightChecked, setConpoyBaseHeightChecked] = useState(false);
  const [ConpoyBulkDensityChecked, setConpoyBulkDensityChecked] =
    useState(false);
  const [ConpoyLayerCountChecked, setConpoyLayerCountChecked] = useState(false);

  /// Map id
  const [mapTypeId, setMapTypeId] = useState("hybrid"); // New state for map type

  useEffect(() => {
    setWeatherPreferences({
      weatherChecked,
      temperatureChecked,
      humidityChecked,
      feelChecked,
      windSpeedChecked,
      windDirectionChecked,
      pressureChecked,
      visibilityChecked,
    });
  }, [
    weatherChecked,
    temperatureChecked,
    humidityChecked,
    feelChecked,
    windSpeedChecked,
    windDirectionChecked,
    pressureChecked,
    visibilityChecked,
    setWeatherPreferences,
  ]);

  //firebase
  useEffect(() => {
    // Reference the Sensor_Data node
    const sensorDataRef = ref(database, "Sensor_Data");

    // Listen for data changes
    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val(); // Fetch the data
      setSensorData(data); // Update state
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const toggleDrawer = () => {
    Drawer(!isOpen);
  };
  const weatherDropdown = () => {
    weatherDropdownOpen(!isWeatherDropdown);
  };
  const mapviewDropdown = () => {
    MapDropdownOpen(!isMapDropdown);
  };
  const FirespreadDropdown = () => {
    FireSpreadDropdownOpen(!isFireSpreadDropdown);
  };
  const ConopyDropdown = () => {
    ConopyDropdownOpen(!isConopyDropdown);
  };
  const SensorsDropdown = () => {
    SensorsDropdownOpen(!isSensersDropdown);
  };

  const handleChange = (e) => {
    setMapTypeId(e.target.value);
  };

  return (
    <div>
      {/* Toggle Button (Arrow) */}
      <button
        className={`toggle-btn ${isOpen ? "open" : ""}`}
        onClick={toggleDrawer}
      >
        {isOpen ? <span>&#8644;</span> : <span>&#8646;</span>}
      </button>
      {/* Sidebar Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="scroll_bar">
          {/* Weather Dropdown Content */}
          <div className="dropdown-container">
            <div className="dropdown-inner-container">
              <div className="dropdown-title">
                <h1>Weather Status</h1>
              </div>
              <div className="dropdown-title-button">
                <button
                  className={`dropdown-btn ${isWeatherDropdown ? "open" : ""}`}
                  onClick={weatherDropdown}
                >
                  {isWeatherDropdown ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            {isWeatherDropdown && (
              <div className="dropdown-content">
                <div className="Sidebar-Content">
                  <div className="Sidebar-Row">
                    {/* Temperature */}
                    <div className="Sidebar-Inner-Content">
                      <img src={temperature} alt="Temperature" />
                      <h2>Temperature</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={temperatureChecked}
                        onChange={(e) =>
                          setTemperatureChecked(e.target.checked)
                        }
                      />
                      <img src={weather} alt="Wind Direction" />
                      <h2>Weather</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={weatherChecked}
                        onChange={(e) => setWeatherChecked(e.target.checked)}
                      />
                    </div>
                    {/* humidity */}
                    <div className="Sidebar-Inner-Content">
                      <img src={humidity} alt="Humidity" />
                      <h2>Humidity</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={humidityChecked}
                        onChange={(e) => setHumidityChecked(e.target.checked)}
                      />
                      <img src={Feel} alt="Feel" />
                      <h2>Feel Like</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={feelChecked}
                        onChange={(e) => setFeelChecked(e.target.checked)}
                      />
                    </div>
                    {/* speed */}
                    <div className="Sidebar-Inner-Content">
                      <img src={wind} alt="Wind" />
                      <h2>Speed</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={windSpeedChecked}
                        onChange={(e) => setWindSpeedChecked(e.target.checked)}
                      />
                      <img src={Pressure} alt="Pressure" />
                      <h2>Pressure</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={pressureChecked}
                        onChange={(e) => setPressureChecked(e.target.checked)}
                      />
                    </div>
                    {/* Direction */}
                    <div className="Sidebar-Inner-Content">
                      <img src={wind_direction} alt="Wind Direction" />
                      <h2>Direction</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={windDirectionChecked}
                        onChange={(e) =>
                          setWindDirectionChecked(e.target.checked)
                        }
                      />
                      <img src={Visibility} alt="Visibility" />
                      <h2>Visibility</h2>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={visibilityChecked}
                        onChange={(e) => setVisibilityChecked(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Map Dropdown Content */}
          <div className="dropdown-container">
            <div className="dropdown-inner-container">
              <div className="dropdown-title">
                <h1>Map View</h1>
              </div>
              <div className="dropdown-title-button">
                <button
                  className={`dropdown-btn ${isMapDropdown ? "open" : ""}`}
                  onClick={mapviewDropdown}
                >
                  {isMapDropdown ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            {/* Map view Dropdown Content */}
            {isMapDropdown && (
              <div className="dropdown-content">
                <div className="Sidebar-Content">
                  <div className="Sidebar-Row">
                    <div className="Conopy-Inner-Content-Row">
                      <div className="Conopy-Inner-Content">
                        <Select
                          value={mapTypeId}
                          onChange={handleChange}
                          width="300px"
                          margin="10px"
                        >
                          <option value="roadmap">Roadmap</option>
                          <option value="satellite">Satellite</option>
                          <option value="terrain">Terrain</option>
                          <option value="hybrid">Hybrid</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* // Fire Spread */}
          <div className="dropdown-container">
            <div className="dropdown-inner-container">
              <div className="dropdown-title">
                <h1>Fire Spread Status</h1>
              </div>
              <div className="dropdown-title-button">
                <button
                  className={`dropdown-btn ${
                    isFireSpreadDropdown ? "open" : ""
                  }`}
                  onClick={FirespreadDropdown}
                >
                  {isFireSpreadDropdown ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            {/* Dropdown Content */}
            {isFireSpreadDropdown && (
              <div className="dropdown-content">
                <div className="Sidebar-Content">
                  <div className="Sidebar-Row">
                    <div className="Firespred-Inner-Content-Row">
                      <div className="Firespred-Inner-Content">
                        <img src={firehotspot} alt="Firehotspots" />
                        <h2>Hot Spots</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={fireHotSpotsChecked}
                          onChange={(e) =>
                            setFireHotSpotsChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Firespred-Inner-Content">
                        <img src={HeatMap} alt="Heat Map" />
                        <h2>Heat Map</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={fireHeatMapChecked}
                          onChange={(e) =>
                            setFireHeatMapChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Firespred-Inner-Content">
                        <img src={firespread} alt="Fire Spread" />
                        <h2>Spread</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={fireSpreadChecked}
                          onChange={(e) =>
                            setFireSpreadChecked(e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* // Conopy Cover */}
          <div className="dropdown-container">
            <div className="dropdown-inner-container">
              <div className="dropdown-title">
                <h1>Conopy Status</h1>
              </div>
              <div className="dropdown-title-button">
                <button
                  className={`dropdown-btn ${isConopyDropdown ? "open" : ""}`}
                  onClick={ConopyDropdown}
                >
                  {isConopyDropdown ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            {/* Conopy Dropdown Content */}
            {isConopyDropdown && (
              <div className="dropdown-content">
                <div className="Sidebar-Content">
                  <div className="Sidebar-Row">
                    <div className="Conopy-Inner-Content-Row">
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyCover} alt="Copony Cover" />
                        <h2>Cover</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={ConpoyCoverChecked}
                          onChange={(e) =>
                            setConpoyCoverChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyHeight} alt="Conopy Height" />
                        <h2>Height</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={ConpoyHeightChecked}
                          onChange={(e) =>
                            setConpoyHeightChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyBaseHeight} alt="Conopy Base Height" />
                        <h2>Base Height</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={ConpoyBaseHeightChecked}
                          onChange={(e) =>
                            setConpoyBaseHeightChecked(e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="Sidebar-Row">
                    <div className="Conopy-Inner-Content-Row">
                      <div className="Conopy-Inner-Content">
                        <img
                          src={ConpoyBulkDensity}
                          alt="Conpoy Bulk Density"
                        />
                        <h2>Bulk Density</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={ConpoyBulkDensityChecked}
                          onChange={(e) =>
                            setConpoyBulkDensityChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyLayerCount} alt="Conpoy Layer Count" />
                        <h2>Layer Count</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={ConpoyLayerCountChecked}
                          onChange={(e) =>
                            setConpoyLayerCountChecked(e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* // Sensors Details */}
          <div className="dropdown-container">
            <div className="dropdown-inner-container">
              <div className="dropdown-title">
                <h1>Real Time Sensors Data</h1>
              </div>
              <div className="dropdown-title-button">
                <button
                  className={`dropdown-btn ${isSensersDropdown ? "open" : ""}`}
                  onClick={SensorsDropdown}
                >
                  {isSensersDropdown ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            {/* Conopy Dropdown Content */}
            {isSensersDropdown && (
              <div className="dropdown-content">
                <div className="Sidebar-Content">
                  <div className="Sidebar-Row">
                    <div className="Conopy-Inner-Content-Row">
                      <div className="Conopy-Inner-Content">
                        <img src={temperature} alt="Temperature Sensor" />
                        <h2>Temperature Sensor</h2>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            backgroundColor: "lightgray",
                            fontWeight: "bold",
                            alignContent: "center",
                            fontSize: "24px",
                            border: "2px solid green",
                            borderRadius: "10px",
                          }}
                        >
                          {sensorData.Temperature_Sensor}°C
                        </div>
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={humidity} alt="Humidity Sensor" />
                        <h2>Humidity Sensors</h2>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            backgroundColor: "lightgray",
                            fontWeight: "bold",
                            alignContent: "center",
                            fontSize: "24px",
                            border: "2px solid green",
                            borderRadius: "10px",
                          }}
                        >
                          {sensorData.Humidity_Sensor}%
                        </div>
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={SmokeSensor} alt="Smoke Sensor" />
                        <h2>Smoke Sensor</h2>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            backgroundColor: "lightgray",
                            fontWeight: "bold",
                            alignContent: "center",
                            fontSize: "24px",
                            border: "2px solid green",
                            borderRadius: "10px",
                          }}
                        >
                          {sensorData.Smoke_Sensor}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Sidebar-Row">
                    <div className="Conopy-Inner-Content-Row">
                      <div className="Conopy-Inner-Content">
                        <img src={GasSensor} alt="Gas Sensor" />
                        <h2>Gas Sensor</h2>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            backgroundColor: "lightgray",
                            fontWeight: "bold",
                            alignContent: "center",
                            fontSize: "24px",
                            border: "2px solid green",
                            borderRadius: "10px",
                          }}
                        >
                          {sensorData.Gas_Sensor}%
                        </div>
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyLayerCount} alt="Conpoy Layer Count" />
                        <h2>Carbon Monoxide</h2>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            backgroundColor: "lightgray",
                            fontWeight: "bold",
                            alignContent: "center",
                            fontSize: "24px",
                            border: "2px solid green",
                            borderRadius: "10px",
                          }}
                        >
                          {sensorData.Carbon_Monoxide}%
                        </div>
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyLayerCount} alt="Conpoy Layer Count" />
                        <h2>Ozone Sensor</h2>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            backgroundColor: "lightgray",
                            fontWeight: "bold",
                            alignContent: "center",
                            fontSize: "24px",
                            border: "2px solid green",
                            borderRadius: "10px",
                          }}
                        >
                          {sensorData.Ozone_Sensor}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Sidebar-Row">
                    <div className="Conopy-Inner-Content-Row">
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyLayerCount} alt="Conpoy Layer Count" />
                        <h2>H₂S Gas Sensor</h2>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            backgroundColor: "lightgray",
                            fontWeight: "bold",
                            alignContent: "center",
                            fontSize: "24px",
                            border: "2px solid green",
                            borderRadius: "10px",
                          }}
                        >
                          {sensorData.H2S_Sensor}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
