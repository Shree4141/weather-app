async function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url =`https://weather-app-xsx8.onrender.com/weather?city=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("City not found!");
            return;
        }

        document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `🌡️ ${data.main.temp}°C`;
        document.getElementById("weatherDescription").innerText = data.weather[0].description;

        updateWeatherUI(data.weather[0].main);
    } catch (error) {
        alert("Error fetching weather data!");
    }
}

/* Function to update background and icon based on weather */
function updateWeatherUI(weather) {
    const body = document.body;
    const icon = document.getElementById("weatherIcon");

    switch (weather.toLowerCase()) {
        case "clear":
            body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
            icon.className = "fas fa-sun";
            break;
        case "clouds":
            body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            icon.className = "fas fa-cloud";
            break;
        case "rain":
            body.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
            icon.className = "fas fa-cloud-showers-heavy";
            break;
        case "snow":
            body.style.background = "linear-gradient(135deg, #e6e9f0, #eef1f5)";
            icon.className = "fas fa-snowflake";
            break;
        case "thunderstorm":
            body.style.background = "linear-gradient(135deg, #373b44, #4286f4)";
            icon.className = "fas fa-bolt";
            break;
        default:
            body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
            icon.className = "fas fa-smog";
            break;
    }

    body.style.transition = "background 0.5s ease-in-out";
}
