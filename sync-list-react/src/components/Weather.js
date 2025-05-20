import React, { useEffect, useState } from "react";

export default function Weather() {
  const [openWeather, setWeather] = useState({});

  useEffect(() => {
    getCoordinates()
      .then((coord) => {
        getWeatherResponse(coord).then((res) => {
          console.log("Got WeatherResponse");
          setWeather(res);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  if (!openWeather.list) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <p>{`${openWeather?.city?.name}, ${openWeather?.city?.country}`}</p>
      <p>{`${Math.round(openWeather?.list[0].main.temp)} °C`}</p>
      <img
        src={`https://openweathermap.org/img/wn/${openWeather?.list[0].weather?.[0]?.icon}.png`}
        alt="condition"
      />

      <p>{openWeather?.list[0].weather[0].description}</p>
      <div>
        {openWeather?.list
          .filter((day) => day.dt_txt.includes("12:00:00"))
          .map((day) => (
            <div key={day.dt}>
              <p>{day.dt_txt}</p>
              <p>{`${openWeather?.city.name}, ${openWeather?.city.country}`}</p>
              <p>{`${Math.round(day.main.temp)} °C`}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="condition"
              />
              <p>{day.weather[0].description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

function getWeatherLink(location) {
  const api_key = "bfbf905c5c0c9c6a028e43fdb56895d8";
  if (typeof location == "string") {
    return `https://api.openweathermap.org/data/2.5/forecast/daily?&q=${location}&appid=${api_key}&units=metric`;
  } else if (typeof location == "object" && location.lat && location.lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${api_key}&units=metric`;
    //return `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=${api_key}`;
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
