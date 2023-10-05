const mongoos = require('mongoose');
require('dotenv').config();

const { DB_AC, DB_PWD } = process.env;

module.exports = mongoos.createConnection(`mongodb+srv://${DB_AC}:${DB_PWD}@cluster0.vgwsacm.mongodb.net/Train?retryWrites=true&w=majority`)
