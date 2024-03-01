const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    picture1: String,
    picture2: String,
    picture3: String,
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;