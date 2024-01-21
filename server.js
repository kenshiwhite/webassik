const express = require('express');
const axios = require('axios');
const {getDataFromOpenWeather} = require("./controllers/OpenWeather");

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/weather', getDataFromOpenWeather);

app.listen(port, () => {
    console.log(`Server listening at PORT: ${port}`);
});
