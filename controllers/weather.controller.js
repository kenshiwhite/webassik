const axios = require("axios");
const {WeatherData} = require("../models/mongo");

const search = async (req, res) => {
    const {city} = req.body;

    const apiKey = '0a3e35c8fae01568ff89bf8cdcb37eb6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        const {username} = req.session;
        await WeatherData.create({
            username,
            city,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
        });

        res.redirect('/main');
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.send('Failed to fetch weather data.');
    }
}

const getInitialData = async (req, res) => {
    const {username} = req.session;

    console.log("Session: ", username);

    const savedWeatherData = await WeatherData.find({username});

    res.render('main', {username, savedWeatherData});
}

module.exports = {
    search,
    getInitialData
}