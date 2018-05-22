"use strict"

const express = require('express');
const http = require('http');
const url = require('url');

const app = express();
var routes = require('./routes.js');

const server = http.createServer(app);

app.use('/', routes);

server.listen(8080, () => {
    console.log('Express server listening on %d', server.address().port);
});

module.exports = {
    server: server
}