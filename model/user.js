const mongoose = require('mongoose');
const connection = require('../connectDB');

const schema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
})

module.exports = connection.model('User', schema);