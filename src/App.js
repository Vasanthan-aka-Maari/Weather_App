import React, { useState } from "react";

function App() {
  const key = "f40c85576cf9f093968b744242214bed";
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${key}`;

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(url)
        // .then(res => console.log(res))
        .then((res) => res.json())
        .then((data) => setWeather(data));
      // console.log(weather);
      setQuery("");
    }
  };

  return (
    <div
      className={
        typeof weather.weather !== "undefined"
          ? weather.weather[0].main === "Clouds"
            ? "App cloudy"
            : weather.weather[0].main === "Haze"
            ? "App sunny"
            : weather.weather[0].main === "Rain"
            ? "App rainy"
            : weather.weather[0].main === "Mist"
            ? "App mist"
            : weather.weather[0].main === "Clear"
            ? "App clear"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyPress={(e) => {
              search(e);
            }}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="error">
            <span className="hero">V</span> says weather
            <br />
            <span className="sub-heading">(search for a place)</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;