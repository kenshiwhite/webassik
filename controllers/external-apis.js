//external-apis.js

const axios = require("axios");
const WeatherData = require('../models/mongo')

// external-apis.js

const { PopulationData } = require('../models/mongo'); // Import PopulationData model


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
const getCityPopulation = async (req, res) => {
    try {
        const { cityName } = req.query;

        const apiUrl = `https://api.api-ninjas.com/v1/city?name=${cityName}`;
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': 'wAUTmHO20xERiz+2kQ/6Ag==iME6ilorrLIikkT0'
            }
        });
        const data = response.data[0];
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching population data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {getDataFromOpenWeather, getCityPopulation}