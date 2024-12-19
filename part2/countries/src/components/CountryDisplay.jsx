/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import weatherService from '../services/weather';
const CountryDisplay = ({ country }) => {
    const [weather, setWeather] = useState(null); // State to hold weather data
    const [error, setError] = useState(null);

    useEffect(() => {
        const { latlng } = country; // Extract latitude and longitude
        if (latlng && latlng.length === 2) {
        const [lat, lon] = latlng;
        weatherService
            .getWeather(lat, lon)
            .then((data) => setWeather(data))
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                setError('Failed to fetch weather data.');
            });
        }
    }, [country]);
    
    const languages = Object.values(country.languages || {});
  
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital && country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <h2>Languages:</h2>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={{ width: '200px', border: '1px solid black' }}
        />
        <h2>Weather in {country.capital && country.capital[0]}</h2>
        {error && <p>{error}</p>}
        {weather ? (
            <div>
            <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
            <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
            </div>
        ) : (
            <p>Loading weather data...</p>
        )}
      </div>
    );
  };
  
export default CountryDisplay;