const cityForm = document.querySelector("#city-form");
const cityInput = document.querySelector("#city-input");
const statusMessage = document.querySelector("#status-message");

const sampleWeather = {
  Lucknow: {
    description: "Partly cloudy",
    icon: "🌤️",
    temperature: 28,
    feelsLike: 30,
    humidity: 65,
    windSpeed: 12,
    forecast: [
      ["Today", "🌤️", 28, "Partly cloudy"],
      ["Tue", "☀️", 30, "Sunny"],
      ["Wed", "⛅", 29, "Mostly sunny"],
      ["Thu", "🌧️", 26, "Light rain"],
      ["Fri", "🌤️", 27, "Partly cloudy"]
    ]
  },
  London: {
    description: "Light rain",
    icon: "🌧️",
    temperature: 16,
    feelsLike: 14,
    humidity: 78,
    windSpeed: 18,
    forecast: [
      ["Today", "🌧️", 16, "Light rain"],
      ["Tue", "☁️", 17, "Cloudy"],
      ["Wed", "🌦️", 18, "Showers"],
      ["Thu", "⛅", 19, "Partly cloudy"],
      ["Fri", "☀️", 20, "Sunny"]
    ]
  },
  Tokyo: {
    description: "Sunny",
    icon: "☀️",
    temperature: 24,
    feelsLike: 25,
    humidity: 52,
    windSpeed: 9,
    forecast: [
      ["Today", "☀️", 24, "Sunny"],
      ["Tue", "🌤️", 25, "Partly cloudy"],
      ["Wed", "⛅", 23, "Mostly cloudy"],
      ["Thu", "🌧️", 21, "Light rain"],
      ["Fri", "☀️", 26, "Sunny"]
    ]
  }
};

function showStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.className = `alert alert-${type}`;
}

function displayWeather(city, weather) {
  document.querySelector("#city-name").textContent = city;
  document.querySelector("#weather-description").textContent = weather.description;
  document.querySelector("#weather-icon").textContent = weather.icon;
  document.querySelector("#temperature").textContent = weather.temperature;
  document.querySelector("#feels-like").textContent = weather.feelsLike;
  document.querySelector("#highlight-feels-like").textContent = weather.feelsLike;
  document.querySelector("#humidity").textContent = weather.humidity;
  document.querySelector("#wind-speed").textContent = weather.windSpeed;

  const forecastContainer = document.querySelector("#forecast-container");
  forecastContainer.replaceChildren();

  weather.forecast.forEach(([day, icon, temperature, description]) => {
    const column = document.createElement("div");
    column.className = "col";
    column.innerHTML = `
      <div class="card weather-card text-center h-100">
        <div class="card-body">
          <p class="text-secondary small">${day}</p>
          <div class="fs-2">${icon}</div>
          <h3 class="h5">${temperature}°C</h3>
          <p class="small mb-0">${description}</p>
        </div>
      </div>
    `;
    forecastContainer.append(column);
  });
}

function previewCity(cityName) {
  const city = Object.keys(sampleWeather).find(
    (name) => name.toLowerCase() === cityName.trim().toLowerCase()
  );
  if (!city) {
    showStatus("Choose Lucknow, London, or Tokyo to preview sample data.", "warning");
    return;
  }

  displayWeather(city, sampleWeather[city]);
  statusMessage.classList.add("d-none");
}

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  previewCity(cityInput.value);
});

previewCity(cityInput.value);
