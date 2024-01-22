async function fetchWeatherData(cityName) {
    try {
        const response = await axios.get(`/weather`, {params: {cityName}});
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function updateWeatherInfo(weatherData) {
    const weatherInfoElement = document.getElementById('weather-info');

    if (weatherData) {
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const feelsLike = weatherData.main.feels_like;
        const humidity = weatherData.main.humidity;
        const pressure = weatherData.main.pressure;
        const windSpeed = weatherData.wind.speed;
        const country = weatherData.sys.country;
        const rainVolume = weatherData.rain ? weatherData.rain['3h'] : 0;

        weatherInfoElement.innerHTML = `
            <p>Temperature: ${temperature} F</p>
            <p>Description: ${description}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            <p>Feels Like: ${feelsLike} F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Country Code: ${country}</p>
            <p>Rain Volume (last 3 hours): ${rainVolume} mm</p>
        `;

        initMap(weatherData.name, weatherData.coord.lat, weatherData.coord.lon);
    } else {
        weatherInfoElement.innerHTML = 'Failed to fetch weather data.';
    }
}

function search() {
    const city = document.querySelector('#city').value;
    fetchWeatherData(city)
        .then((weatherData) => {
            updateWeatherInfo(weatherData);
        })
        .catch((error) => {
            console.error('Error:', error);
            updateWeatherInfo(null);
        });
}

function initMap(city, lat, lon) {
    const cityName = city;

    const map = L.map('map').setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon])
        .addTo(map)
        .bindPopup(cityName)
        .openPopup();
}