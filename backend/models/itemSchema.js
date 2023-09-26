const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    SellerID: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        reqired: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Items', itemSchema);