import React, { useState, useEffect } from "react";
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

function Sidebar({
  fireHotSpotsChecked,
  setFireHotSpotsChecked,
  setWeatherPreferences,
}) {
  const [isOpen, Drawer] = useState(false); // Drawer
  const [isWeatherDropdown, weatherDropdownOpen] = useState(false); // Weather Drop Down
  const [isMapDropdown, MapDropdownOpen] = useState(false); // Map Drop Down
  const [isFireSpreadDropdown, FireSpreadDropdownOpen] = useState(false); // Fire Drop Down
  const [isConopyDropdown, ConopyDropdownOpen] = useState(false); // Fire Drop Down

  // Weather Perameters
  const [temperatureChecked, setTemperatureChecked] = useState(false);
  const [humidityChecked, setHumidityChecked] = useState(false);
  const [windSpeedChecked, setWindSpeedChecked] = useState(false);
  const [windDirectionChecked, setWindDirectionChecked] = useState(false);
  const [weatherChecked, setWeatherChecked] = useState(false);
  const [feelChecked, setFeelChecked] = useState(false);
  const [pressureChecked, setPressureChecked] = useState(false);
  const [visibilityChecked, setVisibilityChecked] = useState(false);
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
                        <img src={ConpoyCover} alt="Copony Cover" />
                        <h2>Default</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={defaultMapChecked}
                          onChange={(e) =>
                            setdefaultMapChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={SatelliteView} alt="Satellite View" />
                        <h2>Satellite</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={satelliteViewChecked}
                          onChange={(e) =>
                            setsatelliteViewChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={StreetView} alt="Street View" />
                        <h2>Street</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={streetViewChecked}
                          onChange={(e) =>
                            setstreetViewChecked(e.target.checked)
                          }
                        />
                      </div>
                      <div className="Conopy-Inner-Content">
                        <img src={ConpoyLayerCount} alt="Conpoy Layer Count" />
                        <h2>Hybrid</h2>
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={hybridViewChecked}
                          onChange={(e) =>
                            sethybridViewChecked(e.target.checked)
                          }
                        />
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
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
