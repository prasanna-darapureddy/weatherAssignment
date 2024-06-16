import { useEffect, useState } from "react";
import { TiWeatherSunny, TiWeatherWindy } from "react-icons/ti";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { ImNotification } from "react-icons/im";
import { MdLightMode } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "./Home.css";

const apiConstants = {
  initial: "initial",
  loading: "loading",
  success: "success",
  failed: "failed",
};

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchRes, setSearchRes] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [positions, setPositions] = useState({ lat: null, long: null });
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    getCurrentLatLong();
  }, []);

  useEffect(() => {
    getCurrentLocationData();
  }, [positions]);

  const handleSearchBtn = () => {
    if (searchValue) {
      getSearchResults();
      setSearchValue("");
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleToggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const getCurrentLatLong = () => {
    const postions = (position) => {
      const latStr =
        position.coords.latitude && position.coords.latitude.toString();
      const lngStr =
        position.coords.longitude && position.coords.longitude.toString();
      const index = latStr.lastIndexOf(".");
      const formatLat = latStr.slice(0, index + 5);
      const formatLong = lngStr.slice(0, index + 5);

      setPositions({
        lat: Number(formatLat),
        long: Number(formatLong),
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(postions);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getCurrentLocationData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
      positions.lat
    }&lon=${positions.long}&appid=${"8258383fad3691852f1fba0737edd5e2"}`;
    const options = { method: "GET" };
    try {
      setApiStatus(apiConstants.success);
      if (positions.lat && positions.long) {
        const response = await fetch(url, options);
        const currentData = await response.json();
        if (response.ok) {
          setCurrentLocation(currentData);
        } else {
          toast.error(currentData.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSearchResults = async () => {
    let url = "";
    if (isNaN) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${"8258383fad3691852f1fba0737edd5e2"}`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${Number(
        searchValue
      )}&appid=${"8258383fad3691852f1fba0737edd5e2"}`;
    }
    const options = {
      method: "GET",
    };
    setApiStatus(apiConstants.loading);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setApiStatus(apiConstants.success);
        setSearchRes(data);
      } else {
        toast.error(data.message);
        setApiStatus(apiConstants.failed);
      }
    } catch (error) {
      setApiStatus(apiConstants.failed);
    }
  };

  const failedView = () => {
    return (
      <div className={isLightMode ? "light-failed-card" : "dark-failed-card"}>
        <ImNotification fontSize={50} />
        <p className="wrong-text">!Oops somthing went wrong</p>
      </div>
    );
  };

  const loadingView = () => {
    return (
      <div className="loading-card">
        <div className="loader"></div>
      </div>
    );
  };

  const successView = () => {
    return (
      <>
        {searchRes && (
          <div
            className={`current-location-card ${
              isLightMode ? "light-res-card " : "dark-res-card "
            }`}
          >
            <h2 className="city">{searchRes && searchRes.name}</h2>
            <ul className="weather-box">
              {searchRes &&
                searchRes.weather.map((each, index) => (
                  <li
                    key={index + "main"}
                    className={
                      isLightMode ? "weather-light-card" : "weather-dark-card"
                    }
                  >
                    <p>
                      Weather : <span className="only-temp">{each.main}</span>
                    </p>
                    <p>
                      Description :{" "}
                      <span className="only-temp"> {each.description}</span>
                    </p>
                  </li>
                ))}
            </ul>
            <div
              className={
                isLightMode ? "weather-light-card" : "weather-dark-card"
              }
            >
              <p>
                Temperature : <FaTemperatureThreeQuarters />
                <span className="only-temp">
                  {searchRes && Math.ceil(searchRes.main.temp - 273.15)}
                  <sup className="degrees">0</sup>{" "}
                  <TiWeatherSunny fontSize={20} />
                </span>
              </p>
            </div>
            <div
              className={
                isLightMode ? "weather-light-card" : "weather-dark-card"
              }
            >
              <p>
                Feels_like :{" "}
                <span className="only-temp">
                  {searchRes && Math.ceil(searchRes.main.feels_like - 273.15)}
                </span>{" "}
                <sup className="degrees">0</sup>{" "}
              </p>
            </div>
            <div
              className={
                isLightMode ? "weather-light-card" : "weather-dark-card"
              }
            >
              <p>
                Humidity :{" "}
                <span className="only-temp">
                  {searchRes && Math.ceil(searchRes.main.humidity)}
                </span>
              </p>
            </div>
            <div
              className={
                isLightMode ? "weather-light-card" : "weather-dark-card"
              }
            >
              <p>
                Pressure :{" "}
                <span className="only-temp">
                  {" "}
                  {searchRes && searchRes.main.pressure}
                </span>
              </p>
            </div>
            <div
              className={
                isLightMode ? "weather-light-card" : "weather-dark-card"
              }
            >
              <p>
                Wind :{" "}
                <span className="only-temp">
                  {searchRes && searchRes.wind.speed}
                  <TiWeatherWindy />
                </span>
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderSearchWeatherView = () => {
    switch (apiStatus) {
      case "loading":
        return loadingView();
      case "failed":
        return failedView();
      case "success":
        return successView();
      default:
        return null;
    }
  };

  const renderCurrentSearchWeather = () => {
    return (
      <div className={`main-card ${isLightMode ? "light-card " : "dark-card"}`}>
        <div className="search-btn-box">
          <input
            type="search"
            className={`search-input ${
              isLightMode ? "light-search-input" : "dark-search-input"
            }`}
            placeholder="Search by city"
            value={searchValue}
            onChange={handleChange}
          />

          <button className="search-btn" onClick={handleSearchBtn}>
            Search
          </button>
        </div>
        <div className="current-search-res-card">
          <div
            className={`current-location-card ${
              isLightMode ? "light-current-card " : "dark-current-card "
            }`}
          >
            <h3
              className={`current-heading ${
                isLightMode ? "light-current-heading" : "dark-current-heading"
              }`}
            >
              Current Location
            </h3>
            <div className="current-child-box">
              <p className="city">Location : </p>
              <span className="city-name">
                {currentLocation && currentLocation.name}
              </span>
            </div>
            <div className="current-child-box">
              <p className="temp">Temperature : </p>
              {currentLocation && (
                <span className="only-temp">
                  {currentLocation &&
                    Math.ceil(currentLocation.main.temp - 273.15)}
                  <sup className="degrees">0</sup>{" "}
                  <TiWeatherSunny fontSize={20} />
                </span>
              )}
            </div>
            <div className="current-child-box">
              <p className="date">Date :{"  "}</p>
              {currentLocation && (
                <span className="only-date">
                  {moment(currentLocation && currentLocation.dt * 1000).format(
                    "MMM Do YY"
                  )}
                </span>
              )}
            </div>
          </div>
          {renderSearchWeatherView()}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className={`bg-container ${
          isLightMode ? "dark-container" : "light-container"
        }`}
      >
        <MdLightMode
          color={isLightMode ? "black" : "white"}
          onClick={handleToggleTheme}
          fontSize={50}
          className="theme-button"
        />
        <div className="heading-card">
          <h1 className={isLightMode ? "dark-heading" : "main-heading"}>
            Weather Report
          </h1>
        </div>
        <div>{renderCurrentSearchWeather()}</div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Home;
