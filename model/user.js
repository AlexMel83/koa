const mongoose = require('mongoose');
const connection = require('../connectDB');

const schema = new mongoose.Schema({
    login: {
        type: String
    },
    pass:{
        type: String
    }
})

module.exports = connection.model('User', schema);