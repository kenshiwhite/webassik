const {WeatherData, User} = require("../models/mongo");
const axios = require("axios");
let searchedCountries = [];

const getWeatherPage = async (req, res) => {
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }

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


const getFactPage = async (req, res) => {
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }

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



const getHolidaysPage = async (req, res) => {
    const country = req.query.country || 'KZ'; // Default country is KZ if not provided
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }

    try {
        const apiUrl = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=2024&type=public_holiday`;
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': 'GtZNuWgkB1bJn4kjXYVWmQ==xRl5srEeKmlP9QEq'
            }
        });
        const holidays = response.data;

        // Store the searched country
        searchedCountries.push(country);

        res.render('holidays', { holidays, searchedCountries });
    } catch (error) {
        console.error('Error fetching holidays:', error);
        res.status(500).send('Internal Server Error');
    }
}


const getAdminPage = async (req, res) => {
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }

    console.log(req.session);
    if (!req.session.isAdmin) {
        const errorMessage = `
            <div style="text-align: center; margin-top: 50px;">
                <p style="color: red; font-size: 18px;">You do not have Admin permissions</p>
                <button onclick="window.history.back()" style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; cursor: pointer;">Go Back</button>
            </div>
        `;
        res.status(403).send(errorMessage);
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