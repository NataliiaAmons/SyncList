import React, { useEffect, useState } from "react";

export default function Weather() {
  const [openWeather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Loading...");
    setIsLoading(true);
    getCoordinates()
      .then((coord) => {
        getWeatherResponse(coord).then((res) => {
          console.log("Got WeatherResponse");
          setWeather(res);
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>Loading weather...</p>;
  }

  if (openWeather.list) {
    const byDays = divideByDate(openWeather.list);
    const current = byDays[0].list[0];
    const currentDate = new Date(current.dt_txt.split(" ")[0]);
    return (
      <div className="widget-container bg-primary text-light">
        <div className="current-day">
          <p className="current-temp">{`${Math.round(current.main.temp)}°`}</p>
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
  }
}

function getWeatherLink(location) {
  const api_key = process.env.REACT_APP_OPENWEATHER_KEY;
  if (typeof location == "string") {
    return `https://api.openweathermap.org/data/2.5/forecast/daily?&q=${location}&appid=${api_key}&units=metric`;
  } else if (typeof location == "object" && location.lat && location.lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${api_key}&units=metric`;
  }
  console.log("Empty link");
  return "";
}

async function getWeatherResponse(location) {
  const link = getWeatherLink(location);
  let response = await fetch(link);
  if (response.ok) {
    return response.json();
  }
  console.log("We got error");
  return {};
}

async function getCoordinates() {
  const coord = await getGeolocation();
  return coord;
}

async function getGeolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        reject(error);
      }
    );
  });
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
