import { useState } from 'react';
import Navbar from './Navbar.jsx'

function Weather() {
  const api = {
    key: "cad3851eb60afd93385d7da8e3b7e59d",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const search = "Delhi";

  const [weather,setWeather] = useState({});
  fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  
  
  return (
    <div className='container'> 
      <Navbar/>
      <h1>Weather GUI</h1>
      {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location  */}
            <p>Location: {weather.name}</p>

            {/* Temperature Celsius  */}
            <p>Temp: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Pressure: {weather.main.pressure} mbar</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
    </div>
  )
}

export default Weather