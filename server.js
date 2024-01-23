const express = require('express');
const axios = require('axios');
const {getDataFromOpenWeather, getCityPopulation, getRandomFact} = require("./controllers/external-apis");

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/weather', getDataFromOpenWeather);
app.get('/population', getCityPopulation);
app.get('/fact', getRandomFact);


app.listen(port, () => {
    console.log(`Server listening at PORT: ${port}`);
});
