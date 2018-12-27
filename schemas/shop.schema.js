var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema(
    {
        name: String,
        numOfAdsSpaces: Number
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Shop', ShopSchema, 'shop');