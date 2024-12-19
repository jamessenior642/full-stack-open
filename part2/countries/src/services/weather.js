import axios from 'axios';

const apiKey = 'e68b6ff9d2c3a9e8819602c545e72067'; // Replace with your OpenWeatherMap API key
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = (lat, lon) => {
  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  return request.then((response) => response.data);
};

export default { getWeather };
