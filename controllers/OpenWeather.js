const axios = require("axios");
const getDataFromOpenWeather = async (req, res) => {
    try {
        const {cityName} = req.query;

        const apiKey = '0a3e35c8fae01568ff89bf8cdcb37eb6';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {getDataFromOpenWeather}