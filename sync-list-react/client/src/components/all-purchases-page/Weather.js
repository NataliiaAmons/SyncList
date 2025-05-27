import React, { useEffect, useRef, useState, useForm } from "react";
import "../../styles/global.css";
import "../../styles/color-scheme.css";
import "../../styles/weather-widget.css";

export default function Weather() {
  const [openWeather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resolved, setResolved] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchWeather = async (useLocation) => {
    const timeoutSeconds = 1000 * 15;
    setError(null);
    setResolved(false);

    if (
      abortControllerRef.current?.controller &&
      !abortControllerRef.current.controller.signal.aborted
    ) {
      abortControllerRef.current.controller.abort();
      clearTimeout(abortControllerRef.current.timeoutId);
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
      setWeather({});
    }, timeoutSeconds);

    abortControllerRef.current = {
      controller,
      timeout,
    };

    var currentCity;
    if (useLocation) {
      currentCity = "";
    } else {
      setCity(inputCity);
      currentCity = inputCity;
    }

    console.log("Loading...");
    setIsLoading(true);

    getCoordinates(currentCity, timeoutSeconds)
      .then((coord) => {
        getWeatherResponse(coord, controller, timeout).then((res) => {
          console.log("Got WeatherResponse");
          setWeather(res);
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  async function getWeatherResponse(location, controller, timeout) {
    const link = getWeatherLink(location);
    try {
      let response = await fetch(link, { signal: controller.signal });
      clearTimeout(timeout);
      console.log("clearTimeout");
      if (response.ok) {
        console.log("response OK");
        const res = await response.json();
        if (
          !res.list ||
          !res.city ||
          !res.list[0].main ||
          !res.list[0].weather
        ) {
          // Error: wrong response format
          setError(
            `Received unexpected data from the server. Please try again.`
          );
          new Error("Wrong response format");
        } else {
          return res;
        }
      } else {
        // Error statuses
        switch (response.status) {
          case 401:
            setError("Invalid API key");
            new Error(`Error: status ${response.status}`);
            break;
          case 404:
            setError("No data available for this location");
            new Error(`Error: status ${response.status}`);
            break;
          default:
            setError(`Error: status ${response.status}`);
            new Error(`Error: status ${response.status}`);
        }
      }
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === "AbortError") {
        setError("Location request timed out. Please try again.");
        console.log(new Error("Request timeout"));
      } else {
        setError(err.message || "Unexpected error");
      }
    }
  }

  async function getCoordinates(city, timeoutSeconds) {
    if (city) {
      return city;
    } else {
      const coord = await Promise.race([
        getGeolocation(),
        new Promise((resolve, _) =>
          setTimeout(() => {
            resolve(setError(null));
          }, timeoutSeconds)
        ),
      ]);
      return coord;
    }
  }

  async function getGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (resolved) return;
          setResolved(true);
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lon: longitude });
          setError(null);
        },
        (error) => {
          if (resolved) return;
          setResolved(true);
          console.error("Geolocation error:", error.message);
          reject(error);
        }
      );
    });
  }

  return (
    <div className="widget-container bg-primary text-light shadow-light-gray-corner">
      {/*Submit form*/}
      <div>
        <div className="widget-title" id="widget-title">
          <p>
            <i className="fa-solid fa-wind"></i> Weather
          </p>
        </div>
        <form
          className="form-city"
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeather(false);
          }}
        >
          <input
            className="city-input bg-light"
            id="city-input"
            type="text"
            placeholder="City"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          ></input>
          <button
            type="submit"
            className="city-submit-button bg-secondary"
            disabled={isLoading || inputCity.trim() === ""}
          >
            Get weather
          </button>
        </form>
        <button
          className="use-location-button bg-support"
          onClick={() => fetchWeather(true)}
          disabled={isLoading}
        >
          Use geolocation
        </button>
      </div>

      {error && (
        <p className="error-message bg-light-gray text-accent border-accent">
          {error}
        </p>
      )}
      {/*Loading state*/}
      {isLoading && !error ? (
        <p className="loader">Loading...</p>
      ) : openWeather && openWeather.list ? (
        (() => {
          //Render API response
          const byDays = divideByDate(openWeather.list);
          const current = byDays[0].list[0];
          const currentDate = new Date(current.dt_txt.split(" ")[0]);
          return (
            <div>
              <div className="current-day">
                <p className="current-temp">{`${Math.round(
                  current.main.temp
                )}°`}</p>
                <p className="current-descript text-secondary">
                  {current.weather[0].description}
                </p>
                <img
                  className="current-weather-icon"
                  src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                  alt="condition"
                />
                <div className="current-info">
                  <p className="current-city text-secondary">{`${openWeather.city.name}, ${openWeather.city.country}`}</p>
                  <div className="current-date">
                    <span className="current-weekday text-secondary">
                      {getWeekday(current.dt_txt.split(" ")[0])}
                    </span>
                    <span className="current-date-text">
                      {currentDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="next-days">
                {byDays.slice(1, 5).map((day) => {
                  return (
                    <div key={day.date} className="one-day">
                      <p className="one-weekday text-secondary">
                        {getWeekday(day.date)}
                      </p>
                      <img
                        src={`https://openweathermap.org/img/wn/${day.list[0].weather[0].icon}.png`}
                        alt="condition"
                      />
                      <p>{`${Math.round(getMaxTemp(day.list))}° / ${Math.round(
                        getMinTemp(day.list)
                      )}°`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()
      ) : null}
    </div>
  );
}

function getWeatherLink(location) {
  const api_key = process.env.REACT_APP_OPENWEATHER_KEY;
  if (typeof location == "string") {
    return `https://api.openweathermap.org/data/2.5/forecast?&q=${location}&appid=${api_key}&units=metric`;
  } else if (typeof location == "object" && location.lat && location.lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${api_key}&units=metric`;
  }
  console.log("Empty link");
  return "";
}

function divideByDate(forecasts) {
  let groups = [];
  forecasts.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === date) {
      lastGroup.list.push(item);
    } else {
      groups.push({ date: date, list: [item] });
    }
  });
  return groups;
}

function getMaxTemp(list) {
  let max = list[0].main.temp;
  list.forEach((item) => {
    if (item.main.temp > max) {
      max = item.main.temp;
    }
  });
  return max;
}
function getMinTemp(list) {
  let min = list[0].main.temp;
  list.forEach((item) => {
    if (item.main.temp < min) {
      min = item.main.temp;
    }
  });
  return min;
}

function getWeekday(string) {
  const date = new Date(string);
  const textNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayNumber = date.getDay();
  return textNames[dayNumber];
}
