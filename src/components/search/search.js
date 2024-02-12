import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import "./search-style.css";
//declare a functional component that takeds an opject as itsprops
const Search = ({ onSearchChange, onClearClick }) => {
  //state to store the current search value
  const [search, setSearch] = useState(null);
  const [error, setError] = useState(null);
  //fetch data from the api based on the input value

  const loadOptions = async (inputValue) => {
    try {
      if (inputValue === null || inputValue === "") {
        setError("");
        return { options: [] };
      }
      setError(null);

      //fetch city data from the specified api
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      if (!response.ok) {
        console.error("Error:", response.status);
        setError("enter a valid city");
        return { options: [] };
      }
      // transform the response data into the format expected by AsyncPaginate(it is a wrapper around select)
      const { data } = await response.json();
      const options = data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return {
        options,
        noOptionsMessage: () => (
          <div className="noOPtionsMessage">
            {error ||
              "Do you really not know any city name? Please enter a valid name."}
          </div>
        ),
      };
    } catch (error) {
      console.error(error);
      setError("enter a valid city");
      return { options: [] };
    }
  };

  //function to handle changes in the search value

  const handleOnChange = (searchData) => {
    //update the local state with the new value
    setSearch(searchData);
    //pass the new value to the parent component
    onSearchChange(searchData);
  };
  const handleOnClear = () => {
    setSearch(null);
    onClearClick();
  };
  // render the AsyncPaginate component
  return (
    <div className="search-container">
      <div className="input-container">
        <AsyncPaginate
          placeholder="Search for city"
          /*means that there is a delay of 0.6 seconds after the user stops typing before the loadOptions function is triggered.
          During this delay, if the user continues typing, the timeout is reset, and the countdown starts again. */
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          noOptionsMessage={() =>
            error ||
            "Do you really not know any city name,Please enter a valid name?"
          }
          style={{
            width: "200px",
            marginRight: "10px",
          }}
        />
        {search && (
          <button className="clear-button" onClick={handleOnClear}>
            X
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
export default Search;
