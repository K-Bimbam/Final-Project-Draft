
let timestamp = new Date();
function formatDate(date) {
  let weekday = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let currentDay = weekday[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${currentDay}, ${hour}:${minute}`;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(timestamp);

function searchCityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#current-city");
  let apiKey = "28166b2fcf9be0d06885af650ff599d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
///function weatherIcon(response){if }
let form = document.querySelector(".search-field");
form.addEventListener("submit", searchCityName);

function showWeather(response) {
  console.log(response);
  document.querySelector("#city-name").innerHTML = response.data.name;

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#maxToday").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minToday").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#date").innerHTML = formatDate(response.data.dt*1000)
}

function showLocation(position) {
  let searchCity = document.querySelector("#current-city");
  let apiKey = "28166b2fcf9be0d06885af650ff599d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
function getMyPosition(response) {
  function myPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "28166b2fcf9be0d06885af650ff599d4";
    let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
    axios
      .get(
        `${weatherUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      )
      .then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(myPosition);
}

let current = document.querySelector("#currentLoc");
current.addEventListener("click", getMyPosition);

let userSearch = document.querySelector("#current-city");
userSearch.addEventListener("submit", showLocation);
