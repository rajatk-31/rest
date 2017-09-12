var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Building = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    restaurants: [{
        rest_name: String,
        rest_status: {
            type: Boolean,
            default: true
        },
        rest_phone: Number,
        created_at: {
            type: Date,
            default: Date.now()
        },
        dishes: [{
            dish_name: String,
            price: Number,
            //tax: Number,
            dish_status: {
                type: Boolean,
                default: true
            },
            //dish_category: String
        }]

    }]

});

module.exports = mongoose.model('building', Building);