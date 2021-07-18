import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
function Weather(props) {
    const [isLoading, setLoading] = useState(true);
    const [weatherdata, setWeatherData] = useState({});
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const params = {
        key: API_KEY,
        q: props.countries[props.index]['capital']
      }
    useEffect(() => {
        axios.get('https://api.weatherapi.com/v1/current.json', {params})
    .then(response => {
      const apiResponse = response.data;
      setWeatherData(apiResponse);
      setLoading(false);
    }).catch(error => {
      console.log(error);
    });
      }, [])
    if (isLoading) {
        return <div className="App">Loading Weather Data</div>;
      }
    return (
        <div>
            <div>The current temperature in {props.countries[props.index]['capital']} is {weatherdata.current.temp_f}</div>
            <img className="image" src={weatherdata.current.condition.icon} />
        </div>
        
  );
}
export default Weather;