const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    picture: String,
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;