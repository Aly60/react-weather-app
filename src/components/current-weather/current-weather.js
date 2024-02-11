import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  // function to determine the background image based on the weather description
  const getBackgroundImage = () => {
    if (data.weather[0].description.includes("clear sky")) {
      return "url('icons/sunny.jpeg')";
    } else if (data.weather[0].description.includes("clouds")) {
      return "url('icons/skyCloud.jpeg')";
    } else if (data.weather[0].description.includes("few clouds")) {
      return "url('icons/skySunnyClouds.jpg')";
    } else if (data.weather[0].description.includes("light rain")) {
      return "url('icons/rain1.jpeg')";
    } else if (data.weather[0].description.includes("drizzle")) {
      return "url('icons/drizzleRain.jpeg')";
    } else if (data.weather[0].description.includes("moderate rain")) {
      return "url('icons/rain.jpeg')";
    } else if (data.weather[0].description.includes("snow")) {
      return "url('icons/snowing.jpeg')";
    } else if (data.weather[0].description.includes("scattered clouds")) {
      return "url('icons/scatredClouds.jpeg')";
    } else if (data.weather[0].description.includes("overcast clouds")) {
      return "url('icons/overcast.jpeg')";
    } else {
      return "url('icons/misty.jpeg')";
    }
  };

  const backgroundImage = getBackgroundImage();
  return (
    <div
      className="weatherImages"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-description">
              {" "}
              {data.weather[0].description}
            </p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.temp)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">wind speed</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">pressure</span>
              <span className="parameter-value">{data.main.pressure} hpa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentWeather;
