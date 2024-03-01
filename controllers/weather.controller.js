const axios = require("axios");
const {WeatherData} = require("../models/mongo");

const express = require('express')
const route = express.Router();

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
            temperature: (weatherData.main.temp - 273).toFixed(1),
            description: weatherData.weather[0].description,
        });

        res.redirect('/main');
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.send('Failed to fetch weather data.');
    }
}

route.post('/weather/create', async (req, res) => {
    try {
        const { city, temperature, description } = req.body;
        const weatherData = await WeatherData.create({ city, temperature, description });
        res.send({success: true})
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

route.get('/weather/weathers', async (req, res) => {
    try {
        const weatherData = await WeatherData.find();
        res.json({ success: true, data: weatherData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

route.get('/weather/:id', async (req, res) => {
    try {
        const weatherData = await WeatherData.findById(req.params.id);
        if (!weatherData) {
            return res.status(404).json({ success: false, error: 'Weather data not found' });
        }
        res.json({ success: true, data: weatherData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

route.put('/weather/:id', async (req, res) => {
    try {
        console.log(req.body)
        const { temperature, description } = req.body;
        const updatedWeatherData = await WeatherData.findByIdAndUpdate(req.params.id, 
            { temperature, description,  updatedAt: new Date()}, 
            { new: true }
        );
        res.send({success: true})
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

route.delete('/weather/:id', async (req, res) => {
    try {
        const deletedWeatherData = await WeatherData.findByIdAndDelete(req.params.id);
        if (!deletedWeatherData) {
            return res.status(404).json({ success: false, error: 'Weather data not found' });
        }
        
        res.send({success: true})
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = {
    search,
    route
}