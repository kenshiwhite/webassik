//server.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const {login, register, deleteUser, updateUser, createUser} = require('./controllers/user.controller')
const {search} = require("./controllers/weather.controller");
const {getWeatherPage, getHolidaysPage, getAdminPage, getItemsAdd, getItemsList, getAdminWeatherPage, getAdminItemPage} = require("./controllers/pages");
const {getCityPopulation } = require('./controllers/external-apis');
const { PopulationData } = require('./models/mongo'); // Import PopulationData model
const countryRoutes = require('./routes/country.routes');
const cors = require('cors');
const path = require('path');
const templatePath = path.join(__dirname, 'views'); 
const i18n = require("i18n");
const Item = require('./models/item'); // Adjust the path accordingly based on your project structure

// const itemList = require('./views/itemList')

const app = express();
const port = 3000;

app.set('views', templatePath); // Now you can use templatePath


console.log(process.env.NODE_ENV);

app.use(cors());
app.use(express.json());
app.use('/countries', countryRoutes);




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({secret: 'test_app', resave: true, saveUninitialized: true}));

app.set('view engine', 'ejs');

const weatherRoutes = require('./controllers/weather.controller')
const itemsRoutes = require('./controllers/item.controller')

app.use('/', weatherRoutes.route)
app.use('/', itemsRoutes)


app.post('/login', login);
app.post('/register', register);
app.post('/search', search);

app.post('/users/create', createUser);
app.delete('/users/:userId', deleteUser);
app.put('/users/:userId', updateUser);

app.get('/main', getWeatherPage);
//app.get('/fact', getFactPage);
app.get('/holidays', getHolidaysPage);
app.get('/admin', getAdminPage);
app.get('/admin/weather', getAdminWeatherPage);
app.get('/admin/items', getAdminItemPage);
app.get('/CityPopulation', getCityPopulation)


app.get('/getCityPopulation', getCityPopulation);
app.get('/itemList', getItemsList);
app.get('/itemAdd', getItemsAdd);


app.get('/population', async (req, res) => {
    res.render('population');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/', (req, res) => {
    res.redirect('/login');
})
app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/itemList', (req, res) => {
    res.redirect('/itemList');
})

app.get('/itemAdd', (req, res) => {
    res.redirect('/itemAdd');
})

const publicPath = path.join(__dirname, '../public');
app.set("view engine", "ejs");
app.set('views', templatePath);
app.use(session({
    secret: "naah",
    resave: false,
    saveUninitialized: true
}));
app.use('/uploads', express.static('uploads'));

i18n.configure({
    locales: ['en', 'ru'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    cookie: 'yourcookiename',
    objectNotation: true,
});
app.use(i18n.init);



// // POST route for adding a new item
// app.post('/add-item', async (req, res) => {
//     const { pictures, name1, name2, description1, description2 } = req.body;

//     const newItem = new Item({
//         pictures: pictures.split(',').map(url => url.trim()),
//         names: [{ lang: 'en', name: name1 }, { lang: 'es', name: name2 }],
//         descriptions: [{ lang: 'en', description: description1 }, { lang: 'es', description: description2 }]
//     });

//     try {
//         await newItem.save();
//         res.redirect('/admin'); // Redirect to admin page after adding the item
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error adding item');
//     }
// });

// app.get('/items', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.render('itemList', { items });
//     } catch (error) {
//         console.error(error);
//     }
// });

// app.get('/items-list', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.render('itemList', { items });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching items');
//     }
// });


// app.get('/items-add-page', (req, res) => {
//     res.render('itemAdd');
// });


// app.get('/items-for-admin', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.render('itemsListAdmin', { items });
//     } catch (error) {
//         console.error(error);
//     }
// });
// // Route to handle item deletion
// app.post('/delete-item/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Item.findByIdAndDelete(id);
//         res.redirect('/items-for-admin');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error deleting item');
//     }
// });


// function authMiddleware(req, res, next) {
//     // Check if the token exists in the session
//     if (req.session && req.session.token) {
//         // Token exists, so user is authenticated
//         next(); // Continue to the next middleware or route handler
//     } else {
//         // Token doesn't exist, so user is not authenticated
//         res.redirect('/login')// Respond with 401 Unauthorized
//     }
// }




app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
