const mongoose = require('mongoose');

const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  capital: {
    type: String,
  },
  currency: {
    type: String,
  },
  language: {
    type: String,
  },
  population: {
    type: Number,
  },
  area: {
    type: Number,
  },
});

const CountryModel = mongoose.model('Country', CountrySchema);

module.exports = { CountryModel };
