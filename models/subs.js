const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 40,
        min: 8
    },
    email: {
        type: String,
        required: true,
        min: 6

    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min:8
    }

})

module.exports = mongoose.model('Subscribers',userschema);