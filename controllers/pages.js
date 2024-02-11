const {WeatherData, User} = require("../models/mongo");
const axios = require("axios");


const getWeatherPage = async (req, res) => {
    const {username} = req.session;

    const savedWeatherData = new Map();
    const data = await WeatherData.find({username});

    for (let i = data.length - 1; i >= 0; i--) {
        const currentData = data[i].city.toLowerCase();

        if (!savedWeatherData.has(currentData)) {
            savedWeatherData.set(currentData, i);
        }
    }


    res.render('main', {
        username,
        savedWeatherData: Array.from(savedWeatherData.values()).map(position => data[position])
    });
}


const getFactPage = async (_, res) => {
    try {
        const apiUrl = `https://api.api-ninjas.com/v1/facts?limit=10`;
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': 'GtZNuWgkB1bJn4kjXYVWmQ==xRl5srEeKmlP9QEq'
            }
        });
        const facts = response.data;

        // res.json(data);
        res.render('fact', {facts});
    } catch (error) {
        console.error('Error fetching fact:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getHolidaysPage = async (_, res) => {
    try {
        const apiUrl = `https://api.api-ninjas.com/v1/holidays?country=KZ&year=2024&type=public_holiday`;
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': 'GtZNuWgkB1bJn4kjXYVWmQ==xRl5srEeKmlP9QEq'
            }
        });
        const holidays = response.data;

        res.render('holidays', {holidays});
    } catch (error) {
        console.error('Error fetching fact:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getAdminPage = async (req, res) => {
    console.log(req.session);
    if (!req.session.isAdmin) {
        res.status(403).send('You do not have Admin permissions');
        return;
    }

    try {
        const users = await User.find();
        res.render('admin', {users});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getWeatherPage,
    getFactPage,
    getHolidaysPage,
    getAdminPage
}