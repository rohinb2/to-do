"use strict"
require('dotenv').load();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var uri = process.env.MONGODB_URI;
console.log(uri);
mongoose.connect(uri, function(err, res) {
    if (err) {
        console.log('Error connecting to MongoDB.')
    } else {
        console.log('No errors connecting to MongoDB.')
    }
});

var mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error'));
mongoDB.once('open', function() {
    console.log('Connected to MongoDB database.');
})

module.exports = mongoDB;