const mongoose = require('mongoose');
const uri = "mongodb+srv://yessimkhan:7fUqK47euzaU91n6@cluster0.chbmyqr.mongodb.net/?retryWrites=true&w=majority";

const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

mongoose.connect(uri, clientOptions);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');

    mongoose.connection.db.admin().command({ping: 1}, (err, result) => {
        if (err) {
            console.error('Error pinging MongoDB:', err);
        } else {
            console.log('MongoDB ping successful:', result);
        }
    });
});

const User = mongoose.model('User', {
    username: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date
});
const WeatherData = mongoose.model('WeatherData', {
    username: String,
    city: String,
    temperature: Number,
    description: String,
});

module.exports = {
    User,
    WeatherData
};
