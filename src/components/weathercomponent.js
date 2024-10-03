import React, { useState, useEffect } from "react";
import "../components/Weather.css";
import weathericon from "../images/weathericon.png";
import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const WeatherComponent = ({ lat, lon, weatherPreferences = {} }) => {
  const [weather, setWeather] = useState(null); // Keep this for fetching weather data locally
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!lat || !lon) {
        console.error("Latitude or longitude is missing.");
        setError("Latitude or weather longitude is missing.");
        setLoading(false);
        return; // Stop further execution if lat/lon is missing
      }

      setLoading(true);
      setError(null);
      console.log("Fetching weather data for: ", lat, lon); // Check lat/lon
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        console.log("Weather data fetched successfully: ", response.data); // Log success
        setWeather(response.data);
      } catch (err) {
        console.error("Error fetching weather data: ", err.message); // Log error
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        weather && (
          <div className="weather-container">
            <div className="weather-icon">
              <img src={weathericon} alt="Weather icon" />
            </div>
            <h3 className="weather-title">{weather.name || "City Name"}</h3>
            {weatherPreferences.temperatureChecked && (
              <p className="weather-info">
                Temperature: {weather.main?.temp}°C
              </p>
            )}
            {weatherPreferences.humidityChecked && (
              <p className="weather-info">
                Humidity: {weather.main?.humidity}%
              </p>
            )}
            {weatherPreferences.windSpeedChecked && (
              <p className="weather-info">
                Wind Speed: {weather.wind?.speed} m/s
              </p>
            )}
            {weatherPreferences.windDirectionChecked && (
              <p className="weather-info">
                Wind Direction: {weather.wind?.deg}°
              </p>
            )}
            {weatherPreferences.weatherChecked && (
              <p className="weather-info">
                Weather: {weather.weather?.[0]?.description}
              </p>
            )}
            {weatherPreferences.feelChecked && (
              <p className="weather-info">
                Feels Like: {weather.main?.feels_like}°C
              </p>
            )}

            {weatherPreferences.pressureChecked && (
              <p className="weather-info">
                Pressure: {weather.main?.pressure} hPa
              </p>
            )}
            {weatherPreferences.visibilityChecked && (
              <p className="weather-info">
                Visibility: {(weather.visibility / 1000).toFixed(1)} km
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default WeatherComponent;
