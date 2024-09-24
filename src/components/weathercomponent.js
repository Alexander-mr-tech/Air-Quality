import React, { useState, useEffect } from "react";
import "../components/Weather.css";
import weathericon from "../images/weathericon.png";
import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const WeatherComponent = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
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
        console.error("Error fetching weather data: ", err.response); // Log error
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchWeatherData();
    } else {
      console.error("Latitude or longitude is missing.");
      setError("Latitude or longitude is missing.");
      setLoading(false);
    }
  }, [lat, lon]);

  const handleCityClick = () => {
    setSelectedCity(weather);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        weather && (
          <div className="weather-container" onClick={handleCityClick}>
            <div className="weather-icon">
              <img src={weathericon} alt="Weather icon" />
            </div>
            <h3 className="weather-title">{weather.name}</h3>
            <p className="weather-info">Temperature: {weather.main?.temp}°C</p>
            <p className="weather-info">
              Weather: {weather.weather?.[0]?.description}
            </p>
            <p className="weather-info">
              Wind Speed: {weather.wind?.speed} m/s
            </p>
            <p className="weather-info">
              Feels Like: {weather.main?.feels_like}°C
            </p>
            <p className="weather-info">Humidity: {weather.main?.humidity}%</p>
            <p className="weather-info">
              Pressure: {weather.main?.pressure} hPa
            </p>
            <p className="weather-info">
              Visibility:{" "}
              {weather.visibility ? weather.visibility / 1000 : "N/A"} km
            </p>
            <p className="weather-info">Wind Direction: {weather.wind?.deg}°</p>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherComponent;
