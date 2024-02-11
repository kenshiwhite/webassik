const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const {login, register, deleteUser, updateUser, createUser} = require('./controllers/user.controller')
const {search} = require("./controllers/weather.controller");
const {getWeatherPage, getHolidaysPage, getFactPage, getAdminPage} = require("./controllers/pages");

const app = express();
const port = 3060;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({secret: 'test_app', resave: true, saveUninitialized: true}));

app.set('view engine', 'ejs');

app.post('/login', login);
app.post('/register', register);
app.post('/search', search);

app.post('/users/create', createUser);
app.delete('/users/:userId', deleteUser);
app.put('/users/:userId', updateUser);

app.get('/main', getWeatherPage);
app.get('/fact', getFactPage);
app.get('/holidays', getHolidaysPage);
app.get('/admin', getAdminPage);
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/', (req, res) => {
    res.redirect('/login');
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
