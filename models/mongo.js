//mongo.js

const mongoose = require('mongoose');
const uri = "mongodb+srv://yessimkhan:7fUqK47euzaU91n6@cluster0.chbmyqr.mongodb.net/?retryWrites=true&w=majority";
const bcrypt = require('bcrypt')

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
/*
const User = mongoose.model('User', {
    username: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date
});*/
const WeatherData = mongoose.model('WeatherData', {
    username: String,
    city: String,
    temperature: Number,
    description: String,
    updatedAt: Date
});

const PopulationData = mongoose.model('PopulationData', {
    cityName: String,
    population: Number,
});


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date
});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = async function(password) {
    if (!password) throw new Error('Password is missing, cannot compare');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password:', error.message);
        return false;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    WeatherData,
    PopulationData
};

module.exports = {
    User,
    WeatherData,
    PopulationData
};
