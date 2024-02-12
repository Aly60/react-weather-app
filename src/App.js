import "./App.css";
import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcast, setForcast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFatch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    // handle the fetch requests
    Promise.all([currentWeatherFetch, forecastFatch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        console.log(weatherResponse);
        console.log(forecastResponse);
        // updating state with the new data
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForcast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  // event handler for clearing the input value and reset the weather data
  const handleClearInput = () => {};
  console.log(currentWeather, forcast);

  //jsx for rendring the components
  return (
    <div className="container">
      <Search
        onSearchChange={handleOnSearchChange}
        onClearClick={handleClearInput}
      />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
