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
    return (
      <div>
        <div>
          <p>{`${openWeather.city.name}, ${openWeather.city.country}`}</p>
          <p>{current.dt_txt}</p>
          <p>{`${Math.round(current.main.temp)} °C`}</p>
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
            alt="condition"
          />
          <p>{current.weather[0].description}</p>
        </div>
        <div>
          {byDays.map((day) => {
            return (
              <div key={day.date}>
                <p>{getWeekday(day.date)}</p>
                <p>{`${Math.round(getMaxTemp(day.list))} °C`}</p>
                <p>{`${Math.round(getMinTemp(day.list))} °C`}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.list[0].weather[0].icon}.png`}
                  alt="condition"
                />
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
  const textNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const dayNumber = date.getDay();
  return textNames[dayNumber];
}
