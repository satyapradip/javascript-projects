const apiKey ="68ab53993d34ac77989cee61cb29cec7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

// Hide weather info initially
weatherDiv.style.display = "none";
errorDiv.style.display = "none";

async function checkWeather(city) {
    if (!city) return; // Don't search if city is empty

    // Show loading state
    weatherDiv.style.opacity = "0.5";
    errorDiv.style.display = "none";

    try {
        const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
            return;
        }

        // Update UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        // Update weather icon based on condition
        switch(data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "clear.png";
                break;
            case "Rain":
                weatherIcon.src = "rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "mist.png";
                break;
            case "Snow":
                weatherIcon.src = "snow.png";
                break;
            default:
                weatherIcon.src = "clear.png";
        }

        // Show weather info
        weatherDiv.style.display = "block";
        weatherDiv.style.opacity = "1";
        errorDiv.style.display = "none";

    } catch (error) {
        console.error("Error fetching weather:", error);
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

// Search when clicking the button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

// Search when pressing Enter in the input
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});

// Initial weather check for default city
checkWeather("Kolkata");






