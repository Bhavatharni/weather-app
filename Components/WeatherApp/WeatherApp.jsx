import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

// Import background images
import clear_bg from '../Assets/clear.jpg'
import cloudy_bg from '../Assets/clouds.jpg'
import drizzle_bg from '../Assets/drizzle.jpg'
import mist_bg from '../Assets/mist.jpg'
import rainy_bg from '../Assets/rainy.jpg'
import snow_bg from '../Assets/snow.jpg'
import sunny_bg from '../Assets/sunny.jpg'
import thunderstorm_bg from '../Assets/thunderstrom.jpg'

const WeatherApp = () => {
  let API_KEY = process.env.REACT_APP_API_KEY
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [city, setCity] = useState("London");
  const [wicon, setWicon] = useState(cloud_icon);
  const [bgImage, setBgImage] = useState(clear_bg);

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return clear_bg;
      case 'clouds':
        return cloudy_bg;
      case 'drizzle':
        return drizzle_bg;
      case 'mist':
      case 'fog':
      case 'haze':
        return mist_bg;
      case 'rain':
        return rainy_bg;
      case 'snow':
        return snow_bg;
      case 'thunderstorm':
        return thunderstorm_bg;
      default:
        return sunny_bg;
    }
  }

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") return 0;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`;
    let response = await fetch(URL);

    let data = await response.json();
    console.log(data);
    if (data.cod === '404') {
      alert("City Not Found!!");
      return;
    }
    setTemp(Math.floor(data.main.temp));
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setCity(element[0].value);

    // Set background image based on weather condition
    setBgImage(getBackgroundImage(data.weather[0].main));

    // Set weather icon
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
      setWicon(clear_icon);
    else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
      setWicon(cloud_icon);
    else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
      setWicon(drizzle_icon);
    else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
      setWicon(drizzle_icon);
    else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
      setWicon(rain_icon);
    else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
      setWicon(rain_icon);
    else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
      setWicon(snow_icon);
    else
      setWicon(clear_icon);
  }

  return (
    <div className='container' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder='Search Your City Here' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="$" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="icon" />
      </div>
      <div className="weather-temp">{temp}°C</div>
      <div className="weather-location">{city}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp