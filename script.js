const apiKey = "06238e9d22b68abefda33a43acfdc334"; // Replace with your actual API key

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function updateDateTime() {
  const now = new Date();
  document.getElementById('datetime').textContent = now.toLocaleString();
}

function applyWeatherTheme(condition) {
  let overlay = document.querySelector('.weather-overlay');
  const body = document.body;

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'weather-overlay';
    document.body.appendChild(overlay);
  }

  // Clean up condition
  condition = condition.toLowerCase();

  function applyWeatherTheme(condition) {
  let overlay = document.querySelector('.weather-overlay');
  const body = document.body;

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'weather-overlay';
    document.body.appendChild(overlay);
  }

  condition = condition.toLowerCase();

  if (condition.includes("clear")) {
    overlay.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/869/869869.png')";
    body.style.background = "linear-gradient(to right, #fbc2eb, #a6c1ee)";
  } else if (condition.includes("cloud")) {
    overlay.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/414/414825.png')";
    body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } else if (condition.includes("rain")) {
    overlay.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1163/1163624.png')";
    body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
  } else if (condition.includes("snow")) {
    overlay.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/642/642102.png')";
    body.style.background = "linear-gradient(to right, #e6dada, #274046)";
  } else {
    overlay.style.backgroundImage = "";
    body.style.background = "linear-gradient(to top right, #74ebd5, #ACB6E5)";
  }
}

}

function updateWeather(data) {
  document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°`;
  document.getElementById('feels').textContent = `Feels like ${Math.round(data.main.feels_like)}°`;
  document.getElementById('desc').textContent = data.weather[0].description;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('wind').textContent = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
  document.getElementById('pressure').textContent = data.main.pressure;
  document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise);
  document.getElementById('sunset').textContent = formatTime(data.sys.sunset);
  document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  updateDateTime();
  applyWeatherTheme(data.weather[0].description);
}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(updateWeather)
    .catch(() => alert('Weather fetch failed.'));
}

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(updateWeather)
    .catch(() => alert('City not found'));
}

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getWeather(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        alert("Location permission denied. Search manually.");
      }
    );
  }
};
