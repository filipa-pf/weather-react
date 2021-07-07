import React, { useState } from "react";
import "./CityForm.css";
import axios from "axios";

export default function CityForm() {
    const [city, setCity] = useState("");
    const [loaded, Setloaded] = useState(false);
    const [weather, setWeather] = useState({});

    function showTemperature(response) {
        setWeather({
            temperature: Math.round(response.data.main.temp),
            humidity: response.data.main.humidity,
            wind: Math.round(response.data.wind.speed * 3.6),
            description: response.data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        });
        Setloaded(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let apiKey = "bcd6bffb67c533bc97521b927a7799b4";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(url).then(showTemperature);
        if (city.length <= 0) {
            alert("Type a city!");
        }
    }

    function updateCity(event) {
        setCity(event.target.value);
    }

    let form = (
        <div className="CityForm">
            <form id="city-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="lbl-color">Enter City</label>
                    <input
                        id="input-city"
                        type="text"
                        className="form-control input-max"
                        autoComplete="off"
                        onChange={updateCity}
                    />
                    <input
                        type="submit"
                        className="btn btn-light detailed-btn"
                        id="btn1"
                        value="Check Weather!"
                    />
                </div>
            </form>
        </div>
    );

    if (loaded) {
        return (
            <div>
                {form}
                <ul>
                    <li>Temperature: {weather.temperature}ºC</li>
                    <li>Wind: {weather.wind}km/h</li>
                    <li>Humidity: {weather.humidity}%</li>
                    <li>Description: {weather.description}</li>
                    <li>
                        <img src={weather.icon} alt="Weather Icon" />
                    </li>
                </ul>
            </div>
        );
    } else {
        return form;
    }
}
